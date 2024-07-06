import { Schema, model } from 'mongoose';

const UserSchame = Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	image: { type: String, default: '/favicon.png' },
	isVerified: { type: Boolean, default: false }
});

const User = model('User', UserSchame);
export { User };
