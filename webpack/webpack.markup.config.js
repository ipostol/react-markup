const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

const relativePath = process.env.MARKUP_PATH + '/';
const config = require(`${relativePath}reactMarkup.json`);

const alias = config.alias || {};
const modulesDirectories = config.modulesDirectories || [];

for (const key in alias) {
  alias[key] = relativePath + alias[key];
}

alias.root = relativePath + (config.root || 'src/components');

const fonts = [
  [/\.woff(\?v=\d+\.\d+\.\d+)?$/],
  [/\.woff2(\?v=\d+\.\d+\.\d+)?$/],
  [/\.(ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/],
].map((font) => {

  const rule = {
    test: font[0],
    use: [
      'file-loader',
    ],
  };

  return rule;

});

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('autoprefixer')({ browsers: ['last 2 version'] }),
    ],
  },
};

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
  ]
  .concat(config.requires ? config.requires.map(r => r[0] === '.' ? `${relativePath}${r}` : r) : [])
  .concat([path.resolve(__dirname, 'hotReload')]),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          postcssLoader
        ]
      },
      {
        test: /\.js?$/,
        exclude: /node_modules\/(?!(react-markup|ANOTHER-ONE)\/).*/,
        use: [
          'babel-loader'
        ],
      },
      {
        test: /\.scss?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          postcssLoader,
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: [
          { loader: 'json-loader' },
        ],
      }
    ].concat(fonts),
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
    filename: '[name].js',
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    port: parseInt(process.env.PORT) || 3333,
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
      mobile: true,
      meta: config.meta || [],
      links: config.links || [],
    })
  ],
  performance: { hints: false },
};
