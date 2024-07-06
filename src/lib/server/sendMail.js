import { USER, PASS } from '$env/static/private';
import nodemailer from 'nodemailer';

const sendMail = async (userEmail, link) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: USER,
			pass: PASS
		}
	});
	const info = await transporter.sendMail({
		from: USER,
		to: userEmail,
		subject: 'User verification',
		html: `<a href=${link}>verify your email</a>`
	});
};

export default sendMail;
