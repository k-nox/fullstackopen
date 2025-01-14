import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'


/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			'@stylistic/js': stylisticJs,
		},
		rules: {
			'eqeqeq': 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { 'before': true, 'after': true }],
			'no-console': 'off',
			'@stylistic/js/indent': [
				'error',
				'tab',
			],
			'@stylistic/js/linebreak-style': [
				'error',
				'unix'
			],
			'@stylistic/js/quotes': [
				'error',
				'single',
			],
			'@stylistic/js/semi': [
				'error',
				'never'
			],
		},
	},
	{
		ignores: ['dist/**', 'build/**'],
	},
]
