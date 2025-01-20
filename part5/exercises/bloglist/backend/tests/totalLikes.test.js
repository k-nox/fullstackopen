import assert from 'node:assert'
import { describe, test } from 'node:test'
import { totalLikes } from '../utils/list_helper.js'
import { blogs } from './fixtures.js'

describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		const result = totalLikes([blogs[0]])
		assert.strictEqual(result, 7)
	})

	test('when list has multiple blogs, calculates likes correctly', () => {
		const result = totalLikes(blogs)
		assert.strictEqual(result, 36)
	})

	test('when list has zero blogs, returns 0 likes', () => {
		const result = totalLikes([])
		assert.strictEqual(result, 0)
	})
})
