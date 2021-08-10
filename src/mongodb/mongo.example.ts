import mongoose from 'mongoose';
const mongoPath: string =
	'Your Mongo URL Here';

export async function mongo() {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return mongoose;
}
