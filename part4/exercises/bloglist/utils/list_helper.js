export const dummy = (_blogs) => {
	return 1
}

export const totalLikes = (blogs) => {
	return blogs.reduce((sum, { likes }) => sum + likes, 0)
}
