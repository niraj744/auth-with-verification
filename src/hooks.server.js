import Connection from '$lib/server/DB_Connection';
import { DATABASE_URL, SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';

Connection(DATABASE_URL);

export const handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	const url = new URL(event.url);
	const restrictedURl = ['/auth/register', '/auth/login'];

	function verifying(token) {
		try {
			const { userId } = jwt.verify(token, SECRET);
			event.locals.userId = userId;
			return true;
		} catch (error) {
			return false;
		}
	}

	const data = verifying(token);

	if (!data) {
		event.locals.message = 'Invalid token';
		if (!url.pathname.startsWith('/auth') && !data) {
			return redirect('307', restrictedURl[1]);
		}
	}

	if (data) {
		event.locals.message =
			'Verify your email address through gmail within 24hr unless your account will be banned';
		if (url.pathname.startsWith('/auth') && data) {
			return redirect('307', '/');
		}
	}

	const response = await resolve(event);

	return response;
};
