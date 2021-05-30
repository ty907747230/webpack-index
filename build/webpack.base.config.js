"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //单文件
  // entry:"./src/index.js",
  // output:{
  //     path:path.join(__dirname,'dist'),
  //     filename:'bundle.js'
  // }

  //多文件
  entry: {
    index: "./src/index.js",
    test: "./src/test.js",
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name]_[chunkhash:8].js",
    // publicPath: "./" //静态资源路径
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/, //排除
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, //缓存
          },
        },
      },

      //图片加载器
      {
        test: /.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./img/[name]_[hash:8].[ext]", //命名占位符对应规则：名字+hash值后8位+文件后缀
              outputPath: "./static",
              publicPath: "../",
            },
          },
        ],
      },

      //小图标加载器，会把小于20k的图标转化为base64
      // {
      //   test: /.(jpg|png|gif)$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 20480,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      filename: "index.html",
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
      cache: true,
      showErrors: true,
      chunks: ["index",'commons'],
      excludeChunks: [],
      title: "index",
      xhtml: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/test.html"),
      filename: "test.html",
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
      cache: true,
      showErrors: true,
      chunks: ["test"],
      excludeChunks: [],
      title: "test",
      xhtml: false,
    }),
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  // optimization: {
  //   splitChunks: {
  //     minSize: 0,
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         minChunks: 1,
  //         chunks: "all",
  //       },
  //     },
  //   },
  // },
};
