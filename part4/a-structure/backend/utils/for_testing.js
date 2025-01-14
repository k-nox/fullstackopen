export const reverse = string => {
	return string
		.split('')
		.reverse()
		.join('')
}

export const average = (array) => {
	return array.length === 0
		? 0
		: array.reduce((sum, item) => sum + item, 0) / array.length
}


