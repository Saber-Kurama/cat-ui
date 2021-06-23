const fse = require("fs-extra");
const path = require("path");
const { babel } = require("@rollup/plugin-babel");
// const resolve = require('rollup-plugin-node-resolve');
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const tailwindcss = require("tailwindcss");
const postcssImport = require("postcss-import") 

// 排除那些目录
const excludeDir = ['alert'];
let componentDir = [];
// 获取实体类
const getComponentEntry = () => {
  // 1. 读取 src 的目录  ----》 找到 所有  目录
  const dirInfo = fse.readdirSync(path.resolve(__dirname, "../src"), {
    withFileTypes: true,
  });
  // 2. 排除不需要的
  componentDir = dirInfo
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
    .filter((name) => !excludeDir.includes(name));
  console.log("componentDir", componentDir);
};
const getInput = (name) => {
  return `src/${name}/index.ts`;
};

const getOutput = (name, type) => {
    return {
        file: `dist/${name}/index.js`,
        format: type,
        exports: "auto",
      }
}

const getExternal = (name) => {
  return (id, parentId, isResolved) => {
    console.log('name--', name)
    console.log('id', id);
    console.log('parentId', parentId)
    console.log('isResolved', isResolved)
    if(parentId ){
      const idpath = path.resolve(path.dirname(parentId), id)
      console.log('idpathidpath', idpath)
      const relPath = path.relative(path.resolve(__dirname, '..', `src/${name}`), idpath)
      if(relPath.startsWith('..')){
        return true
      }
    }
    return false;
  }
}

const universalPlugins = () => [
  // resolve(),
  postcss({
    extract: true,
    plugins: [tailwindcss({})]
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
];

const getRollupConfig = () => {
  getComponentEntry();
  const rollupConfig =  componentDir.map((name) => ({
    input: getInput(name),
    output: getOutput(name, 'es'),
    external: getExternal(name),
    plugins: universalPlugins() 
  }));
  console.log(JSON.stringify(rollupConfig))
  rollupConfig.unshift(
    {
      input: getInput('alert'),
      output: {
        file: 'dist/alert/index.js',
        format: 'es',
        exports: "auto",
      },
      external: getExternal('alert'),
      // external: 
      //   (id, parentId, isResolved) => {
      //     // console.log('id---', id)
      //     // console.log('parentId---', parentId)
      //     // console.log('isResolved---', isResolved)
      //     if(parentId && !isResolved){
      //       const idpath = path.resolve(path.dirname(parentId), id)
      //       const p = path.relative(path.resolve(__dirname, '..', 'src/alert'), idpath)
      //       // console.log('pppp', p)
      //       if(p.startsWith('..')){
      //         // console.log('<><><><.')
      //         return true
      //       }
      //     }
          
      //     // if(id === 'lodash'){ return true}
      //     // if(id === '../alert') {return true}
      //     // if(id === './style/index.css') {return true}
      //     // if(id === '/Users/saber/coding/mygithub/cat-ui/src/alert/alert.ts') {return true}
      //     // if(id === '/Users/saber/coding/mygithub/cat-ui/src/alert/style/index.css') {return true}
      //     return false
      //   },
      plugins: universalPlugins(),
      // plugins: [
      //   // resolve(),
      //   postcss({
      //     extract: true,
      //     plugins: [tailwindcss()]
      //   }),
      //   typescript(),
      //   commonjs({
      //     extensions: [".js", ".jsx", ".ts", ".tsx"],
      //   }),
      //   babel({
      //     babelHelpers: "bundled",
      //     exclude: "node_modules/**",
      //     // 必须设置 extensions，默认不包括 ts 和 tsx. see: https://babeljs.io/docs/en/babel-core#default_extensions
      //     extensions: [".js", ".jsx", ".ts", ".tsx"],
      //   }),
      // ],
    },
    )
  return rollupConfig;
};

export default () => {
  return getRollupConfig();
};
