
const pathLib = require("path");
const { 
  defineConfig,
} = require('@vue/cli-service');


module.exports = defineConfig({
  publicPath: '/wbpkotpts/mainvue2/',
  outputDir: pathLib.resolve(__dirname, "../wbpkotpts/mainvue2/"),
  transpileDependencies: true,
  chainWebpack: (cfg)=>{
    cfg.plugin('module-federation-plugin')
      .use(require('webpack').container.ModuleFederationPlugin, [{
        name: "github_web4more", 
        // filename: "mf.js",
        remotes: { // 导入
          remote_libs: 'remote_libs@https://justfn.github.io/wbpkotpts/remote-libs/mf.js',
          remote_vue_applications: 'remote_vue_applications@https://justfn.github.io/wbpkotpts/remote-vue-applications/mf.js',
        },
      }]);
  },
  configureWebpack: (cfg)=>{
    // cfg.optimization.splitChunks = false;
    
  },
});

