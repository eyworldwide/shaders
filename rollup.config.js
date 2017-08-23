import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const glsl = () => {
  return {
    transform( code, id ) {
      if ( !/\.glsl$|\.vert$|\.frag$/.test( id ) ) return
      //
      const res = glslify( code )
      //
      return 'export default ' + JSON.stringify(
        res
        .replace( /[ \t]*\/\/.*\n/g, '' )
        .replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' )
        .replace( /\n{2,}/g, '\n' )
      ) + ';'
    },
  }
}

function generateConfig (src, dest) {
	return {
		entry: src,
		dest: dest,
		format: 'umd',
		moduleName: 'Sound',
		sourceMap: 'inline',
		plugins: [
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			commonjs(),
			glsl(),
			eslint({
				exclude: [
					'src/styles/**'
				]
			}),
			babel({
				compact: true,
				exclude: 'node_modules/**',
				presets: [['es2015-rollup']]
			}),
			(process.env.NODE_ENV === 'production' && uglify())
		]
	}
}

export default [
	generateConfig('src/main.js', 'build/main.js')
	// ,generateConfig('demo/index.js', 'demo/bundle.js')
]

