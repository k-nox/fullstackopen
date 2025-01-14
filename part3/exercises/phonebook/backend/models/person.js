import mongoose from 'mongoose'

const url =
	process.env.NODE_ENV === 'development'
		? process.env.MONGODB_URI_DEV
		: process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		minLength: 12,
		validate: {
			validator: (v) => {
				return /\d{3}-\d{3}-\d{4}/.test(v)
			},
			message: (props) => {
				return `${props.value} is not a valid phone number; please use format xxx-xxx-xxxx`
			},
		},
		required: true,
	},
})

personSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	flattenObjectIds: true,
	transform: (document, returnedObject) => {
		delete returnedObject._id
		return returnedObject
	},
})

export default mongoose.model('Person', personSchema)
