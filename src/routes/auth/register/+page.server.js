import { superValidate, message, setError, fail } from 'sveltekit-superforms';
import { yup } from 'sveltekit-superforms/adapters';
import { object, string } from 'yup';
import { User } from '$lib/server/Models/User.js';
import jwt from 'jsonwebtoken';
import { SECRET } from '$env/static/private';
import sendMail from '$lib/server/sendMail';
import { genSalt, hash } from 'bcrypt';

const userSchame = object({
	firstName: string().min(4, 'firstName must contain 4 letter').required(),
	lastName: string().min(4, 'lastName must contain 4 letter').required(),
	email: string().email('Must be a valid email').required(),
	username: string().min(4, 'username must contain 4 letter').required(),
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
		const { username, password, ...data } = form.data;

		const isUsernameExists = await User.findOne({ username: username });
		try {
			if (isUsernameExists === null) {
				const salt = await genSalt(10);
				const hashpassword = await hash(password, salt);
				const user = await User.create({
					...data,
					password: hashpassword,
					username: `@${username}`
				});
				const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '24hr' });
				event.cookies.set('token', token, { path: '/' });
				const link = `http://localhost:5173/confirmUser?token=${token}`;
				await sendMail(user.email, link);
			}
		} catch ({ errors }) {
			if (errors?.username) {
				return setError(form, 'username', 'Username already exists try another username.');
			}
			if (errors?.email) {
				return setError(form, 'email', 'Email already exists try another email.');
			}
			return message(form, errors);
		}
	}
};
