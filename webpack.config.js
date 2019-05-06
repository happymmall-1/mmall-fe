/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-14 03:32:45
 * @LastEditTime: 2019-05-06 22:04:59
 */
const webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}
var config = {
  mode: 'development',
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': './src/page/index/index.js',
    'login': './src/page/login/index.js',
    'result': './src/page/result/index.js'
  },
  output: {
    filename: 'js/[name].js',
    publicPath: '/dist',
    path: path.resolve(__dirname, 'dist')
  },
  externals: { // 可以将外部的模块和变量加载进来,例如:从CDN加载的jQuery
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader'
    }, {
      test: /\.string$/,
      loader: 'html-loader'
    }]
  },
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image',
    }
  },
  plugins: [
    // 独立通用模块打包到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    // 把CSS单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    // HTML模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '用户登陆')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
  ]
};

if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;