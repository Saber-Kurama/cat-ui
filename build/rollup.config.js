/**
 * @type {import('rollup').RollupOptions}
 */
const name = 'sasa'
const file = type => `dist/${name}.${type}.js`
export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  }
  // output: [
  //   {
  //     file: './dist/umd/my-lib-umd.js',
  //     format: 'umd',
  //     name: 'myLib'
  //   },
  //   {
  //     file: './dist/es/my-es.js',
  //     format: 'es',
  //   },
  //   {
  //     file: './dist/cjs/my-cjs.js',
  //     format: 'cjs',
  //   }
  // ]
}