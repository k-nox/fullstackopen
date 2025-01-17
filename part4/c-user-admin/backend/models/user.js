import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	passwordHash: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note',
		},
	],
})

userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	flattenObjectIds: true,
	transform: (_doc, ret) => {
		delete ret._id
		delete ret.passwordHash
	},
})

export default mongoose.model('User', userSchema)
