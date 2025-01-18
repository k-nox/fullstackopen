import { Schema, model } from 'mongoose'

const userSchema = new Schema({
	username: String,
	passwordHash: String,
	name: String,
})

userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (_doc, ret) => {
		delete ret._id
		delete ret.passwordHash
	},
})

export const User = model('User', userSchema)
