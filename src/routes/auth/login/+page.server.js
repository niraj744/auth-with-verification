import { superValidate, message, fail } from 'sveltekit-superforms';
import { yup } from 'sveltekit-superforms/adapters';
import { object, string } from 'yup';
import { User } from '$lib/server/Models/User.js';
import jwt from 'jsonwebtoken';
import { SECRET } from '$env/static/private';
import { compare } from 'bcrypt';
import { redirect } from '@sveltejs/kit';

const userSchame = object({
	email: string().email('Must be a valid email').required(),
	password: string().min(5, 'password must contain 5 letter').required()
});

export const load = async ({ request, locals, cookies }) => {
	const form = await superValidate(request, yup(userSchame));
	const token = cookies.get('token');
	if (!token) {
		return {
			form
		};
	} else {
		return {
			form,
			message: locals.message
		};
	}
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, yup(userSchame));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		const isUsernameExists = await User.findOne({ email: email });
		if (isUsernameExists) {
			const valid = await compare(password, isUsernameExists.password);

			if (email === isUsernameExists.email && valid) {
				const token = jwt.sign({ userId: isUsernameExists._id }, SECRET, { expiresIn: '24hr' });
				event.cookies.set('token', token, { path: '/' });
				return redirect(303, '/');
			} else {
				return message(form, 'Invalid credential', {
					status: 403
				});
			}
		} else {
			return message(form, 'User could not be found', {
				status: 403
			});
		}
		// try {
		// } catch ({ errors }) {
		// 	if (errors?.email) {
		// 		return setError(form, 'email', 'Email already exists try another email.');
		// 	}
		// 	return message(form, errors);
		// }
	}
};
