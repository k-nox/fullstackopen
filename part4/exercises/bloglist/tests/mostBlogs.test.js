import assert from 'node:assert'
import { describe, test } from 'node:test'
import { mostBlogs } from '../utils/list_helper.js'
import { blogs } from './fixtures.js'

describe('mostBlogs', () => {
	test('given list of authors, returns author with the most blogs', () => {
		const result = mostBlogs(blogs)
		assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
	})

	test('given list of one blog, returns that author and a count of one', () => {
		const result = mostBlogs([blogs[0]])
		assert.deepStrictEqual(result, { author: 'Michael Chan', blogs: 1 })
	})

	test('given empty list, returns null', () => {
		const result = mostBlogs([])
		assert.deepStrictEqual(result, null)
	})
})
