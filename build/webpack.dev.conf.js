var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: 'src/assets/favicon.png',
      inject: true,
      chunks: [
        'app',
        'hljs.bash',
        'hljs.coffeescript',
        'hljs.excel',
        'hljs.java',
        'hljs.javascript',
        'hljs.json',
        'hljs.less',
        'hljs.cpp',
        'hljs.markdown',
        'hljs.php',
        'hljs.python',
        'hljs.scss',
        'hljs.shell',
        'hljs.sql',
        'hljs.vim',
        'hljs.xml'
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'ppt.html',
      template: 'ppt.html',
      favicon: 'src/assets/favicon.png',
      inject: true,
      chunks: ['manifest', 'ppt'],
      chunksSortMode: 'manual'
    }),
    new FriendlyErrorsPlugin()
  ]
})