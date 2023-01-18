
const pathLib = require("path");
const webpack = require('webpack');
const { 
  defineConfig,
} = require('@vue/cli-service');

const packageJson = require("./package.json");
const sourceDir = 'wbpkotpts';
const isLocal = process.env.run_env === 'local';
const envCfg = isLocal 
  ? require("./env_cfg/env.cfg.dev.js")
  : require("./env_cfg/env.cfg.prd.js");
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
          let remoteItm = envCfg.mfRemoteMap[key];
          if (!remoteItm) {
            return retV;
          }
          
          let {
            protocol,
            hostname,
            port,
            path,
          } = remoteItm;
          retV[key] = `${key}@${protocol}//${hostname}:${port}${path}/mf.js`;
          return retV;
        }, {}),
      }]);
  },
  configureWebpack: (cfg)=>{
    // cfg.optimization.splitChunks = false;
    
  },
});

