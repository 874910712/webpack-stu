const path = require("path"); //nodejs 核心模块，专门用于处理路径问题
// 引入eslint插件
const ESLintPlugin = require("eslint-webpack-plugin");
// html插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// css提取插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 用于获取处理样式的loader
function getStyleLoader(pre) {
  return [
    // 执行顺序，从上到下
    MiniCssExtractPlugin.loader, // 将js中的css通过创建style标签加载到htl文件中
    "css-loader", // 将css资源编译成commonjs的模块到js中
    // css兼容性处理，这个loader必须在cssloader后面才行，loader如果要加配置就写成这种对象形式即可
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre,
  ].filter(Boolean);
}

module.exports = {
  //入口（相对路径）
  entry: "./src/main.js",
  //输出
  output: {
    // 项目所有打包文件的输出路径（绝对路径）
    // __distname nodejs的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, "../dist"),
    // 入口文件的输出文件名
    filename: "static/js/main.js",
    // 自动清空上次打包结果
    // 在打包前将dist目录清空，再进行打包
    clean: true,
  },
  //加载器
  module: {
    //loader配置
    rules: [
      {
        // 检测.css文件
        test: /\.css$/,
        use: getStyleLoader(),
      },
      // less 文件处理
      {
        test: /\.less$/,
        use: getStyleLoader("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader("sass-loader"),
      },
      // 静态图片资源预处理
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        // 文件传输，如果小于10kb的会以base64传输
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转base64以减少页面请求次数
            maxSize: 10 * 1024,
          },
        },
        generator: {
          // 输出图片的名称(hash：文件hashID，ext：文件扩展名，query：url额外参数)
          filename: "static/img/[hash:10][ext][query]",
        },
      },
      // 静态文件处理(可以往test加任何文件后缀名)
      {
        test: /\.(ttf|woff2|mp3|avi?)$/,
        // 文件原封不动传输,不进行base64转化
        type: "asset/resource",
        generator: {
          // 输出图片的名称(hash：文件hashID，ext：文件扩展名，query：url额外参数)
          filename: "static/media/[hash:10][ext][query]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/, // 需要排除的文件（这些文件不处理）
        use: {
          loader: "babel-loader",
          // 这里可以进行babel的相关配置
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        },
      },
    ],
  },
  //插件
  plugins: [
    new ESLintPlugin({
      // Eslint检测哪些文件
      context: path.resolve(__dirname, "../src"),
    }),
    // html插件
    new HtmlWebpackPlugin({
      // 新的html文件特点： 1. 结构与原来的一致 2.自动引入打包输出的资源文件
      template: path.resolve(__dirname, "../public/test.html")
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/index.css"
    }),
    // css压缩
    new CssMinimizerPlugin(),
  ],
  //模式
  mode: "production",
  // 编译后代码和源码映射关系
  devtool: "source-map"
};
