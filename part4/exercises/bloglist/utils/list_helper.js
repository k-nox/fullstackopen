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

export const mostBlogs = (blogs) => {
	const counts = {}
	blogs.forEach(({ author }) => {
		counts[author] = counts[author] ? counts[author] + 1 : 1
	})

	return Object.keys(counts).reduce((maxAuthor, currAuthor) => {
		return maxAuthor && counts[maxAuthor.author] > counts[currAuthor]
			? maxAuthor
			: { author: currAuthor, blogs: counts[currAuthor] }
	}, null)
}

export const mostLikes = (blogs) => {
	const counts = {}
	blogs.forEach(({ author, likes }) => {
		counts[author] = counts[author] ? counts[author] + likes : likes
	})

	return Object.keys(counts).reduce((maxAuthor, currAuthor) => {
		return maxAuthor && counts[maxAuthor.author] > counts[currAuthor]
			? maxAuthor
			: { author: currAuthor, likes: counts[currAuthor] }
	}, null)
}
