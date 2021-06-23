/**
 * @type {import('rollup').RollupOptions}
 */
const { babel } = require("@rollup/plugin-babel");
// const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const path = require('path');

const name = "sasa";
const file = (type) => `dist/${name}.${type}.js`;
export default [
//   {
//   // input: [
//   //   'src/index.ts',
//   //   'src/alert/index.ts',
//   //   'src/button/index.ts'],
//   // input: {
//   //   // index: "src/index.ts",
//   //   "alert/index": "src/alert/index.ts",
//   //   "button/index": "src/button/index.ts",
//   // },
//   // output: [
//   //   {
//   //     dir: "es",
//   //     format: "es",
//   //     exports: "auto",
//   //   },
//   //   {
//   //     dir: "cjs",
//   //     format: "cjs",
//   //     exports: "auto",
//   //   },
//   // ],
//   input: 'src/alert/index.ts',
//   output: {
//     file: 'dist/alert/index.js',
//     format: 'es',
//     exports: "auto",
//   },
//   plugins: [
//     // resolve(),
//     postcss({
//       extract: true,
//     }),
//     typescript(),
//     commonjs({
//       extensions: [".js", ".jsx", ".ts", ".tsx"],
//     }),
//     babel({
//       babelHelpers: "bundled",
//       exclude: "node_modules/**",
//       // 必须设置 extensions，默认不包括 ts 和 tsx. see: https://babeljs.io/docs/en/babel-core#default_extensions
//       extensions: [".js", ".jsx", ".ts", ".tsx"],
//     }),
//   ],
// },
{
  input: 'src/button/index.ts',
  output: {
    file: 'dist/button/index.js',
    format: 'es',
    exports: "auto",
  },
  external: 
    (id, parentId, isResolved) => {
      // console.log('id---', id)
      // console.log('parentId---', parentId)
      // console.log('isResolved---', isResolved)
      if(parentId && !isResolved){
        const idpath = path.resolve(path.dirname(parentId), id)
        const p = path.relative(path.resolve(__dirname, '..', 'src/button'), idpath)
        // console.log('pppp', p)
        if(p.startsWith('..')){
          // console.log('<><><><.')
          return true
        }
      }
      
      // if(id === 'lodash'){ return true}
      // if(id === '../alert') {return true}
      // if(id === './style/index.css') {return true}
      // if(id === '/Users/saber/coding/mygithub/cat-ui/src/alert/alert.ts') {return true}
      // if(id === '/Users/saber/coding/mygithub/cat-ui/src/alert/style/index.css') {return true}
      return false
    },
  plugins: [
    // resolve(),
    postcss({
      extract: true,
    }),
    typescript(),
    commonjs({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      // 必须设置 extensions，默认不包括 ts 和 tsx. see: https://babeljs.io/docs/en/babel-core#default_extensions
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
  ],
}];
