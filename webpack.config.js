const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('style.css');

  return {
    entry: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&reload=true',
      path.join(__dirname, '/client/index.js'),
    ],
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    plugins: [
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
        'process.env': { NODE_ENV: JSON.stringify('development') },
      }),
    ],
    context: __dirname,
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    resolve: {
      modules: ['./node_modules'],
      alias: {
        src: path.resolve(__dirname, '..', 'client/src'),
        assets: path.resolve(__dirname, '..', 'public/assets'),
      },
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
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
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
