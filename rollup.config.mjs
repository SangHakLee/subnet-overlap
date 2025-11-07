import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const config = [
	// UMD build (non-minified)
	{
		input: 'src/subnet-overlap.ts',
		output: {
			file: 'dist/browser/subnetOverlap.js',
			format: 'umd',
			name: 'subnetOverlap',
			sourcemap: true
		},
		plugins: [
			resolve({
				browser: true,
				preferBuiltins: false
			}),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				compilerOptions: {
					module: 'esnext',
					target: 'es2015'
				},
				declaration: false,
				declarationMap: false
			})
		]
	},
	// UMD build (minified)
	{
		input: 'src/subnet-overlap.ts',
		output: {
			file: 'dist/browser/subnetOverlap.min.js',
			format: 'umd',
			name: 'subnetOverlap',
			sourcemap: true
		},
		plugins: [
			resolve({
				browser: true,
				preferBuiltins: false
			}),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				compilerOptions: {
					module: 'esnext',
					target: 'es2015'
				},
				declaration: false,
				declarationMap: false
			}),
			terser({
				format: {
					comments: false
				}
			})
		]
	}
]

export default config
