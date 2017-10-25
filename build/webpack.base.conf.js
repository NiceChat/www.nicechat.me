var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var lang = require('highlight.js-async-webpack/src/file.lang.hljs.js');
var _entry= {
  app: './src/main.js',
  ppt: './src/ppt.js'
}
var iNeedLanguage = [
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

for (var i = 0; i < lang.length; i++) {
  if (iNeedLanguage.indexOf(lang[i]) !== -1) {
    _entry[lang[i]] = ['mavon-editor/dist/js/' + lang[i] + '.js']
  }
}

module.exports = {
  entry: _entry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'helper': resolve('src/helper'),
      'style': resolve('src/style')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
        exclude: /prism/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
