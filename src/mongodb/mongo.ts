import mongoose from 'mongoose';
const mongoPath: string = 'mongodb+srv://Obligator:Ecotis3017@cluster0.oin1d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

export async function mongo() {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return mongoose;
}
