/**
 * @type {import('rollup').RollupOptions}
 */
const { babel } = require("@rollup/plugin-babel");
// const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');

const name = "sasa";
const file = (type) => `dist/${name}.${type}.js`;
export default {
  // input: [
  //   'src/index.ts',
  //   'src/alert/index.ts',
  //   'src/button/index.ts'],
  input: {
    // index: "src/index.ts",
    "alert/index": "src/alert/index.ts",
    "button/index": "src/button/index.ts",
  },
  output: [
    {
      dir: "es",
      format: "es",
      exports: "auto",
    },
    {
      dir: "cjs",
      format: "cjs",
      exports: "auto",
    },
  ],
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
};
