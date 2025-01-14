const MONGODB_URI =
	process.env.NODE_ENV === 'development'
		? process.env.MONGODB_URI_DEV
		: process.env.MONGODB_URI

const PORT = process.env.PORT

export const config = { MONGODB_URI, PORT }
