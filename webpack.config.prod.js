const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const WebpackBar = require('webpackbar');
// const CompressionPlugin = require("compression-webpack-plugin");
// const BrotliPlugin = require("brotli-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: [
      path.resolve(`${__dirname}/src/css/app.scss`),
      path.resolve(`${__dirname}/src/app.js`),
    ],
  },
  output: {
    path: path.resolve(`${__dirname}/dist`),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/dist/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: [path.resolve(`${__dirname}src`)],
        use: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                Autoprefixer({
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'not ie <= 8',
                  ],
                }),
              ],
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
        test: /\.(png|jpg|gif|svg)$/,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].[hash:8].css',
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(`${__dirname}`),
      verbose: true,
    }),
    new WebpackBar(),
    // new BrotliPlugin({
    //   test: /\.(js|css|html|svg)$/,
    //   deleteOriginalAssets: false,
    // }),
    // new CompressionPlugin({
    //   test: /\.(js|css|html|svg)$/,
    //   algorithm: 'gzip',
    //   deleteOriginalAssets: false,
    // }),
    // new HtmlWebpackPlugin(),
  ],
};
