import { test } from 'node:test'
import { dummy } from '../utils/list_helper.js'
import assert from 'node:assert'

test('dummy returns one', () => {
	const blogs = []
	const result = dummy(blogs)
	assert.strictEqual(result, 1)
})
