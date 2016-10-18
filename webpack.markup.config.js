const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

const relativePath = `${__dirname}/../../`;
const config = require(`${relativePath}reactMarkup.json`);

const alias = config.alias || {};
const eslintConfig = relativePath + (config.eslintConfig || '.eslintrc');
const modulesDirectories = config.modulesDirectories || [];

for (const key in alias) {
  alias[key] = relativePath + alias[key];
}

alias.root = relativePath + (config.root || 'src/components');

module.exports = {
  entry: [
    './lib/markup.js'
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: `${__dirname}/node_modules/react-hot-loader!babel-loader?babelrc=false&extends=${require('path').join(__dirname, '/.babelrc')}`
      },
      {
        test: /\.scss?$/,
        loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded&sourceMap'
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
    extensions: ['', '.js', '.scss', '.json'],
    modulesDirectories: [
      'node_modules',
    ].concat(modulesDirectories),
    alias: alias,
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  postcss: () => ([
    autoprefixer({ browsers: ['last 2 version'] })
  ]),
  eslint: {
    configFile: eslintConfig
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 3333,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  devtool: '#inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Markup',
      inject: false,
      template: htmlTemplate,
      filename: 'index.html',
      appMountId: 'react-root',
      mobile: true
    })
  ]
};
