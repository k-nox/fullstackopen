import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url =
	process.env.NODE_ENV === "development"
		? process.env.MONGODB_URI_DEV
		: process.env.MONGODB_URI;

mongoose
	.connect(url)
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	important: Boolean,
});

noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default mongoose.model("Note", noteSchema);
