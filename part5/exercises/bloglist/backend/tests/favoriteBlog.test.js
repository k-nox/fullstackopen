import assert from 'node:assert'
import { describe, test } from 'node:test'
import { favoriteBlog } from '../utils/list_helper.js'
import { blogs } from './fixtures.js'

describe('favoriteBlog', () => {
	test('returns correct blog given list of blogs', () => {
		const result = favoriteBlog(blogs)
		assert.deepStrictEqual(result, blogs[2])
	})

	test('given list of one blog, returns that blog', () => {
		const result = favoriteBlog([blogs[0]])
		assert.deepStrictEqual(result, blogs[0])
	})

	test('given empty list, returns null', () => {
		const result = favoriteBlog([])
		assert.deepStrictEqual(result, null)
	})
})
