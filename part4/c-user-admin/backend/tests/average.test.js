import assert from 'node:assert'
import { describe, test } from 'node:test'
import { average } from '../utils/for_testing.js'

describe('average', () => {
	test('of one value is the value itself', () => {
		assert.strictEqual(average([1]), 1)
	})

	test('of many is calculated right', () => {
		assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
	})

	test('of empty array is zero', () => {
		assert.strictEqual(average([]), 0)
	})
})