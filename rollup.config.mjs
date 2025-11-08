import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const config = [
	// UMD build (non-minified)
	{
		input: 'src/subnet-overlap.ts',
		output: {
			file: 'dist/browser/subnetOverlap.js',
			format: 'umd',
			name: 'subnetOverlap',
			sourcemap: true,
			exports: 'default'
		},
		plugins: [
			nodePolyfills(),
			resolve({
				browser: true,
				preferBuiltins: false,
				// Include dependencies in bundle for standalone usage
				exportConditions: ['browser', 'module', 'import', 'default', 'require'],
				// Look in node_modules for dependencies
				moduleDirectories: ['node_modules']
			}),
			commonjs({
				// Convert CommonJS modules (like netaddr) to ES modules
				include: /node_modules/,
				requireReturnsDefault: 'auto'
			}),
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
			sourcemap: true,
			exports: 'default'
		},
		plugins: [
			nodePolyfills(),
			resolve({
				browser: true,
				preferBuiltins: false,
				// Include dependencies in bundle for standalone usage
				exportConditions: ['browser', 'module', 'import', 'default', 'require'],
				// Look in node_modules for dependencies
				moduleDirectories: ['node_modules']
			}),
			commonjs({
				// Convert CommonJS modules (like netaddr) to ES modules
				include: /node_modules/,
				requireReturnsDefault: 'auto'
			}),
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
