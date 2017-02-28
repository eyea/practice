var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

//定义一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
 // 项目的文件夹，可以直接用文件夹名称，默认会找index.js，也可以确定是哪个文件名字
 entry: APP_PATH,
// 输出的文件名，合并以后的js会命名为 bundle.js
 output: {
   path: BUILD_PATH,
   filename: 'bundle.js'
 },
 plugins: [
  new HtmlwebpackPlugin({
    title: 'hello world app'
  })
 ],
 module: {
  rules: [
    // {
    // 	test: /\.jsx?$/,
    // 	loader: ['bebel-loader'],
    // 	include: APP_PATH,
    // 	query: {
    // 		presets: ['es2015']
    // 	}
    // }
    {
      test: /\.scss$/,
      loader: ['style-loader','css-loader','sass-loader'],
      include: APP_PATH
    },{
	    test: /\.(png|jpg)$/,
	    loader: ['file-loader']
    }
  ]
 }

};
