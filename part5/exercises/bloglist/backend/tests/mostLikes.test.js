import assert from 'node:assert'
import { describe, test } from 'node:test'
import { mostLikes } from '../utils/list_helper.js'
import { blogs } from './fixtures.js'

describe('mostLikes', () => {
	test('given list of authors, returns author with the most likes', () => {
		const result = mostLikes(blogs)
		assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
	})

	test('given list of one blog, returns that author and their likes', () => {
		const result = mostLikes([blogs[0]])
		assert.deepStrictEqual(result, { author: 'Michael Chan', likes: 7 })
	})

	test('given empty list, returns null', () => {
		const result = mostLikes([])
		assert.deepStrictEqual(result, null)
	})
})
