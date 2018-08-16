const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const CSSExtract = new ExtractTextPlugin('style.css');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: [
      // 'webpack-hot-middleware/client?__webpack_hmr&timeout=20000',
      path.join(__dirname, 'client/index.js'),
    ],
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './public/index.html',
        // inject: 'body',
        // filename: 'index.html',
        // hash: true,
        // favicon: './public/favicon.ico',
      }),
      CSSExtract,
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new UglifyJSPlugin({
        test: /\.js($|\?)/i,
        sourceMap: true,
        cache: true,
        parallel: true,
        uglifyOptions: {
          mangle: true,
          ecma: 8,
          warnings: false,
          ie8: true,
          safari10: true,
          output: {
            comments: false,
          },
          compress: {
            dead_code: true,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        },
        canPrint: true
      })
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
            fallback: 'style-loader',
            use: [
              { 
                loader: 'css-loader',
                options: {minimize: true}
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    autoprefixer({
                      browsers: 'last 2 versions',
                    }),
                  ]
                },
              },
              { loader: 'sass-loader' },
            ],
          }),
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            { loader: 'babel-loader' },
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
    }
};
