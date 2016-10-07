const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

const nodePath = '';
const path = `${__dirname}/../../`;
const config = require(`${path}reactMarkup.json`);

const alias = config.alias || {};
const eslintConfig = path + (config.eslintConfig || '.eslintrc');

for (const key in alias) {
  alias[key] = path + alias[key];
}

alias.root = path + (config.root || 'src/components');

module.exports = {
  entry: [
    './lib/markup.js'
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `${nodePath}eslint-loader`
      },
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: `${nodePath}react-hot-loader!${nodePath}babel-loader`
      },
      {
        test: /\.scss?$/,
        loader: `${nodePath}style-loader!${nodePath}css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!${nodePath}postcss-loader!${nodePath}sass-loader?outputStyle=expanded&sourceMap`
      },
      { test: /\.css$/, loader: `${nodePath}style-loader!css-loader` },
      { test: /\.json$/, loader: `${nodePath}json-loader` },
      { test: /\.ttf$/, loader: `${nodePath}url-loader?limit=100000&mimetype=application/font-ttf` },
      { test: /\.eot$/, loader: `${nodePath}url-loader?limit=100000&mimetype=application/vnd.ms-fontobject` },
      { test: /\.woff2$/, loader: `${nodePath}url-loader?limit=100000&mimetype=application/font-woff2` },
      { test: /\.woff$/, loader: `${nodePath}url-loader?limit=100000&mimetype=application/font-woff` },
      { test: /\.png$/, loader: `${nodePath}url-loader?limit=100000000&mimetype=image/png` },
      { test: /\.jpg$/, loader: `${nodePath}url-loader?limit=100000000&mimetype=image/jpg` },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: `${nodePath}url-loader?limit=10000&mimetype=image/svg+xml` }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.json'],
    modulesDirectories: [
      `${__dirname}/node_modules`,
      'node_modules',
      'src'
    ],
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
