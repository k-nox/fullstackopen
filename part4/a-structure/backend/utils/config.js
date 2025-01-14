const PORT = process.env.PORT
const MONGODB_URI =
	process.env.NODE_ENV === 'development'
		? process.env.MONGODB_URI_DEV
		: process.env.MONGODB_URI

export default { PORT, MONGODB_URI }
