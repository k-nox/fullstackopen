import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: String,
	url: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
		min: 0,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
})

blogSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	flattenObjectIds: true,
	transform: (_doc, ret) => {
		delete ret._id
	},
})

export const Blog = model('Blog', blogSchema)
