import jwt from 'jsonwebtoken';
import { SECRET } from '$env/static/private';
import { User } from '$lib/server/Models/User';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, cookies }) => {
	const token = cookies.get('token');

	const paramsToken = new URL(url).searchParams.get('token');

	const verify1 = jwt.verify(paramsToken, SECRET);
	const verify2 = jwt.verify(token, SECRET);

	const user = await User.findByIdAndUpdate(verify1.userId, { isVerified: true });

	return redirect(307, '/');
};
