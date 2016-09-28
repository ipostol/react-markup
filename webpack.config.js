const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

console.log(__dirname, '???????');

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
        loader: 'react-hot-loader!babel-loader'
      },
      {
        test: /\.scss?$/,
        loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded&sourceMap'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.ttf$/, loader: 'url-loader?limit=100000&mimetype=application/font-ttf' },
      { test: /\.eot$/, loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject' },
      { test: /\.woff2$/, loader: 'url-loader?limit=100000&mimetype=application/font-woff2' },
      { test: /\.woff$/, loader: 'url-loader?limit=100000&mimetype=application/font-woff' },
      { test: /\.png$/, loader: 'url-loader?limit=100000000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?limit=100000000&mimetype=image/jpg' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.json'],
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      docsPath: `${__dirname}/../../src/components`
    }
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
    configFile: './.eslintrc'
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 3333,
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
