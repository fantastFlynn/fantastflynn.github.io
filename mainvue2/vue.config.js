
const pathLib = require("path");
const webpack = require('webpack');
const { 
  defineConfig,
} = require('@vue/cli-service');

const packageJson = require("./package.json");
const sourceDir = 'wbpkotpts';
const remoteUrl = `https://justfn.github.io/${sourceDir}`;
const remoteList = [
  'remote_libs',
  'remote_vue_applications',
];

module.exports = defineConfig({
  publicPath: `/${sourceDir}/${packageJson.name}/`,
  outputDir: pathLib.resolve(__dirname, `../${sourceDir}/${packageJson.name}/`),
  transpileDependencies: true,
  chainWebpack: (cfg)=>{
    cfg.plugin('module-federation-plugin')
      .use(webpack.container.ModuleFederationPlugin, [{
        name: "github_web4more", 
        // filename: "mf.js",
        remotes: remoteList.reduce((retV, key, idx)=>{ 
          retV[key] = `${key}@${remoteUrl}/${key}/mf.js`;
          return retV;
        }, {}),
      }]);
  },
  configureWebpack: (cfg)=>{
    // cfg.optimization.splitChunks = false;
    
  },
});

