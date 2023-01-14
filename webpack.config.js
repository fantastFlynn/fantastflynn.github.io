// Generated using webpack-cli https://github.com/webpack/webpack-cli

const pathLib = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const is_production = process.env.NODE_ENV == "production";
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

const packageJson = require("./package.json");
const sourceDir = 'wbpkotpts';
const remoteUrl = `https://justfn.github.io/${sourceDir}`;
const remoteList = [
  'remote_libs',
];

const config = {
  entry: "./src/index.js",
  output: {
    path: pathLib.resolve(__dirname, `./wbpkotpts/${packageJson.name}`),
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
    new webpack.container.ModuleFederationPlugin({
      name: `remote_${packageJson.name}`,
      remotes: remoteList.reduce((retV, key, idx)=>{ 
        retV[key] = `${key}@${remoteUrl}/${key}/mf.js`;
        return retV;
      }, {}),
    }),
  ],
  
  devServer: {
    open: true,
    host: "localhost",
  },
};

module.exports = () => {
  if (is_production) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
