import mongoose from 'mongoose';
import validator from 'mongoose-unique-validator';

const Connection = async (url) => {
	try {
		await mongoose.connect(url, { dbName: 'auth' });
		console.log('database connected');
	} catch (error) {
		console.log(error.message);
	}
};

mongoose.plugin(validator);

export default Connection;
