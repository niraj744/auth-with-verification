import { User } from '$lib/server/Models/User.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, locals }) => {
	const user = await User.findById(locals.userId).select('-password');
	return {
		user: JSON.stringify(user),
		message: locals.message
	};
};

export const actions = {
	logout: async ({ cookies }) => {
		const token = cookies.delete('token', { path: '/' });
		return redirect(303, '/auth/login');
	}
};
