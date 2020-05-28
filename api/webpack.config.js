const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './server.js',
  output: {
    libraryTarget: 'commonjs',
    filename: 'bundle.js',
  },
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        include: __dirname,
        use: {
          loader: 'babel-loader',
          // options: {
          //   plugins: ['@babel/plugin-transform-modules-commonjs'],
          // },
        },
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
};
