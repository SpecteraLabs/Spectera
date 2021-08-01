import mongoose from 'mongoose';
const mongoPath: string = 'your mongo path here';

export async function mongo() {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return mongoose;
}
