const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      path.resolve(`${__dirname}/src/css/app.scss`),
      path.resolve(`${__dirname}/src/app.js`),
    ],
  },
  output: {
    path: path.resolve(`${__dirname}/dist`),
    filename: 'js/[name].js',
    publicPath: '/dist/',
  },
  resolve: {
    alias: {
      // '@css': path.resolv(`${__dirname  }/client/src/css`),
    },
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(`${__dirname}`),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[name].[hash:8].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(`${__dirname}`),
      verbose: true,
    }),
    new WebpackBar(),
    // new HtmlWebpackPlugin(),
  ],
};
