import { Schema, model } from 'mongoose'

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 3,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	name: String,
	blogs: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Blog',
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

export const User = model('User', userSchema)
