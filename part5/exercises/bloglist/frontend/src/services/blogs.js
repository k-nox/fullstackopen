import axios from 'axios'

const baseUrl = '/api/blogs'

export const getAllBlogs = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const formatToken = (token) => {
	return `Bearer ${token}`
}

export const createBlog = async (newBlog, token) => {
	const response = await axios.post(baseUrl, newBlog, {
		headers: { Authorization: formatToken(token) },
	})

	return response.data
}
