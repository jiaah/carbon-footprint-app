const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('style.css');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: [
      hotMiddlewareScript,
      path.join(__dirname, 'client/index.js'),
    ],
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: 'bundle.js',
      publicPath: '/',
      hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
      hotUpdateMainFilename: '.hot/[hash].hot-update.json'
    },
    plugins: [
      // new CleanWebpackPlugin('dist'),
      new HTMLWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
        filename: 'index.html',
        hash: true,
        favicon: './public/favicon.ico',
      }),
      CSSExtract,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        uglifyOptions:{
          minimize: true,
          output: {
            comments: false, // remove comments
          },
          compress: {
            unused: true,
            dead_code: true, // big one--strip code that will never execute
            warnings: false, // good for prod apps so users can't peek behind curtain
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            drop_console: true, // strips console statements
            sequences: true,
            booleans: true,
          }
        },
      }),
      // new CompressionPlugin()
    ],
    context: __dirname,
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    resolve: {
      modules: ['./node_modules'],
      extensions: ['.js', '.jsx', '.json', '*'],
    },
    module: {
      rules: [
        {
          // SCSS + CSS
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  minimize: true
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  minimize: true
                },
              },
            ],
          }),
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'react', 'stage-2', 'react-hmre'],
              },
            },
          ],
        },
        {
          // Assets (img)
          test: /\.svg$/,
          loader: 'file-loader',
          options: {
            name: 'assets/svg/[name].[ext]',
          },
        },
        {
          // Other type of images import
          test: /\.(jpe?g|png|gif)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/img/[name].[ext]',
          },
        },
      ],
    },
  };
};
