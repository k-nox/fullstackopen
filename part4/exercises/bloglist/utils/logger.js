const info = (...params) => {
	console.log(...params)
}

const error = (...params) => {
	console.log(...params)
}

export const logger = { info, error }
