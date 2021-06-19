/**
 * @type {import('rollup').RollupOptions}
 */
const name = 'sasa'
const file = type => `dist/${name}.${type}.js`
export default {
  // input: [
  //   'src/index.ts', 
  //   'src/alert/index.ts', 
  //   'src/button/index.ts'],
  input: {
    'index': 'src/index.ts',
    'arert/index': 'src/alert/index.ts'
  },
  output: [
    {
      dir:'dist/es',
      format: 'es'
    },
    {
      dir: 'dist/cjs',
      format: 'cjs'
    }
  ],
  // output: {
  //   name,
  //   dir: 'dist',
  //   // file: file('esm'),
  //   format: 'es'
  // }
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