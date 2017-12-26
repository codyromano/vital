const path = require('path');

module.exports = {
  entry: ["babel-polyfill", "./script/index.js"],
  output: {
    path: __dirname,
    publicPath: "/public/", 
    filename: "./public/generated/bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000
  },
  resolve: {
    alias: {
      'vital-components': path.resolve(__dirname, 'script/components/'),
      'vital-utils': path.resolve(__dirname, 'script/utils/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
};
