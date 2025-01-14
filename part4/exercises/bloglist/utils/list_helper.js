export const dummy = (_blogs) => {
	return 1
}

export const totalLikes = (blogs) => {
	return blogs.reduce((sum, { likes }) => sum + likes, 0)
}

export const favoriteBlog = (blogs) => {
	return blogs.reduce((max, blog) => {
		return max && max.likes > blog.likes ? max : blog
	}, null)
}
