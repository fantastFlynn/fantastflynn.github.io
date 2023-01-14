
const pathLib = require("path");
const webpack = require('webpack');
const { 
  defineConfig,
} = require('@vue/cli-service');

const packageJson = require("./package.json");
const sourceDir = 'wbpkotpts';
const remoteUrl = `https://justfn.github.io/${sourceDir}`;


module.exports = defineConfig({
  publicPath: `/${sourceDir}/${packageJson.name}/`,
  outputDir: pathLib.resolve(__dirname, `../${sourceDir}/${packageJson.name}/`),
  transpileDependencies: true,
  chainWebpack: (cfg)=>{
    cfg.plugin('module-federation-plugin')
      .use(webpack.container.ModuleFederationPlugin, [{
        name: "github_web4more", 
        // filename: "mf.js",
        remotes: { 
          remote_libs: `remote_libs@${remoteUrl}/remote_libs/mf.js`,
          remote_vue_applications: `remote_vue_applications@${remoteUrl}/remote_vue_applications/mf.js`,
        },
      }]);
  },
  configureWebpack: (cfg)=>{
    // cfg.optimization.splitChunks = false;
    
  },
});

