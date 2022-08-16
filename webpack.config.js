const path = require("path"); //nodejs 核心模块，专门用于处理路径问题
// 引入eslint插件
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  //入口（相对路径）
  entry: "./src/main.js",
  //输出
  output: {
    // 项目所有打包文件的输出路径（绝对路径）
    // __distname nodejs的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"),
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
        use: [
          // 执行顺序，从上到下
          "style-loader", // 将js中的css通过创建style标签加载到htl文件中
          "css-loader", // 将css资源编译成commonjs的模块到js中
        ],
      },
      // less 文件处理
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: "style-loader", // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader", // 将 Sass 编译成 CSS
          },
        ],
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
    ],
  },
  //插件
  plugins: [
    new ESLintPlugin({
      // Eslint检测哪些文件
      content: path.resolve(__dirname, "src"),
    }),
  ],
  //模式
  mode: "development",
};
