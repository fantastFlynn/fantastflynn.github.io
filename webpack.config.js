// Generated using webpack-cli https://github.com/webpack/webpack-cli

const pathLib = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const packageJson = require("./package.json");
const sourceDir = 'wbpkotpts';
const is_production = process.env.NODE_ENV == "production";
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
const envCfg = is_production 
  ? require("./env_cfg/env.cfg.prd.js") 
  : require("./env_cfg/env.cfg.dev.js");
const remoteList = [
  'remote_libs',
];

const config = {
  entry: "./src/main.js",
  output: {
    path: pathLib.resolve(__dirname, `./${sourceDir}/${packageJson.name}`),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader", 
          "postcss-loader", 
          "less-loader"
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader", 
          "postcss-loader"
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new webpack.DefinePlugin({
      'process.env.app_name': JSON.stringify(packageJson.name),
      webpack_define_app_name: JSON.stringify(packageJson.name),
      webpack_define_is_prd: JSON.stringify(is_production),
      webpack_define_env_cfg: JSON.stringify(envCfg),
    }),
    
    new webpack.container.ModuleFederationPlugin({
      name: `remote_${packageJson.name}`,
      remotes: remoteList.reduce((retV, key, idx)=>{ 
        let remoteItm = envCfg[key];
        if (!remoteItm) {
          return retV;
        }
        
        let {
          host,
          port,
          path,
        } = remoteItm;
        retV[key] = `${key}@${host}:${port}${path}/${key}/mf.js`;
        return retV;
      }, {}),
    }),
  ],
};

module.exports = () => {
  if (is_production) {
    config.mode = "production";
    
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    return config;
  } 
  
  config.mode = "development";
  // config.output.publicPath = `/${sourceDir}/${packageJson.name}`;
  config.devServer = {
    open: true,
    // host: "localhost",
    host: envCfg.devHost,
    port: envCfg.devPort,
    // proxy: {
    //   [`/${sourceDir}`]: {
    //     target: `http://${envCfg.devHost}:7799`,
    //     // changeOrigin: true,
    //   },
    // },
  };
  return config;
};
