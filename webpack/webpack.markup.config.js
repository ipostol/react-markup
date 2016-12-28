const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

const relativePath = '/Users/kolombor/projects/favbet/uikit/';
const config = require(`${relativePath}reactMarkup.json`);

const alias = config.alias || {};
const modulesDirectories = config.modulesDirectories || [];

for (const key in alias) {
  alias[key] = relativePath + alias[key];
}

alias.root = relativePath + (config.root || 'src/components');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'hotReload'),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss?$/,
        loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded&sourceMap'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.ttf$/, loader: 'url-loader?limit=100000&mimetype=application/font-ttf' },
      { test: /\.eot$/, loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject' },
      { test: /\.woff2$/, loader: 'url-loader?limit=100000&mimetype=application/font-woff2' },
      { test: /\.woff$/, loader: 'url-loader?limit=100000&mimetype=application/font-woff' },
      { test: /\.png$/, loader: 'url-loader?limit=100000000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?limit=100000000&mimetype=image/jpg' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.html$/, loader: 'html' },
    ]
  },
  resolve: {
    modules: [
      path.join(relativePath, 'node_modules'),
      'node_modules',
    ].concat(modulesDirectories),
    alias: alias,
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 3333,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Markup',
      inject: false,
      template: htmlTemplate,
      filename: 'index.html',
      appMountId: 'react-root',
      mobile: true
    }),
  ],
  performance: { hints: false },
};
