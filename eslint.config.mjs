import js from '@eslint/js'
import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

export default [
	js.configs.recommended,
	{
		files: ['src/**/*.ts', 'index.ts'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 2018,
				sourceType: 'module'
			},
			globals: {
				...globals.node,
				...globals.es2015
			}
		},
		plugins: {
			'@typescript-eslint': tseslint
		},
		rules: {
			...tseslint.configs.recommended.rules,
			'no-console': 'warn',
			'indent': ['error', 'tab'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'never'],
			'@typescript-eslint/explicit-function-return-type': ['error', {
				allowExpressions: true
			}],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': ['error', {
				argsIgnorePattern: '^_'
			}]
		}
	},
	{
		files: ['**/*.js', '**/*.mjs'],
		languageOptions: {
			ecmaVersion: 2018,
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.es2015
			}
		},
		rules: {
			'no-console': 'warn',
			'indent': ['error', 'tab'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'never']
		}
	},
	{
		files: ['test/**/*.ts'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 2018,
				sourceType: 'module'
			},
			globals: {
				...globals.node,
				...globals.jest
			}
		},
		plugins: {
			'@typescript-eslint': tseslint
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'no-console': 'off',
			'@typescript-eslint/no-require-imports': 'off'
		}
	},
	{
		ignores: [
			'node_modules/**',
			'dist/**',
			'docs/**',
			'coverage/**',
			'*.min.js',
			'cidrOverlapped.js',
			'subnetOverlap.js',
			'src/subnet-overlap.js',
			'test/index.spec.js',
			'test/browser.test.ts'
		]
	}
]
