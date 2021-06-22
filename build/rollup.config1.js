/**
 * @type {import('rollup').RollupOptions}
 */
const { babel } = require("@rollup/plugin-babel");
// const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const multi  = require('@rollup/plugin-multi-entry');


export default {
  input: ['src/batman.js', 'src/robin.js', 'src/joker.js'],
  output: {
    dir: 'output'
  },
  plugins: [
    multi({})
  ]
};
