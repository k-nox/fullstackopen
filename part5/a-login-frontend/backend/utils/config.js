const PORT = process.env.PORT
const MONGODB_URI =
	process.env.NODE_ENV === 'production'
		? process.env.MONGODB_URI
		: process.env.MONGODB_URI_DEV

export default { PORT, MONGODB_URI }
