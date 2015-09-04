// Webpack config for creating the production bundle.

var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var strip = require('strip-loader')

var relativeAssetsPath = '../dist'
var assetsPath = path.join(__dirname, relativeAssetsPath)

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'))

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': './src/client.js'
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: './'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules|autocrat-/, loaders: [strip.loader('debug'), 'babel?stage=0&optional=runtime&plugins=typecheck'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style!css!cssnext' },
      // { test: /\.css$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]__[hash:base64:5]!cssnext' },
      // { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    fallback: path.resolve(__dirname, '..', 'node_modules'),
    extensions: ['', '.json', '.js'],
    alias: {
      'lodash.foreach': path.resolve(__dirname, '..', 'node_modules', 'lodash.foreach'),
      'lodash.forEach': path.resolve(__dirname, '..', 'node_modules', 'lodash.foreach')
    }
  },
  plugins: [
    new CleanPlugin([relativeAssetsPath]),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     keep_fnames: true,
    //     unused: false,
    //     keep_fargs: true
    //   }
    // }),

    webpackIsomorphicToolsPlugin
  ]
}
