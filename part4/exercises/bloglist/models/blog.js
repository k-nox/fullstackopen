import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

blogSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (_doc, ret) => {
		delete ret._id
	},
})

export const Blog = model('Blog', blogSchema)
