import assert from 'node:assert'
import { describe, test } from 'node:test'
import { dummy, totalLikes } from '../utils/list_helper.js'

test('dummy returns one', () => {
	const blogs = []
	const result = dummy(blogs)
	assert.strictEqual(result, 1)
})
