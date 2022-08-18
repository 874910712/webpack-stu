module.exports = {
  // 预设
  presets: [
    //一个智能预设，允许你使用最新的javaScript(es)
    ["@babel/preset-env",
      //corejs按需加载自动引入配置,项目内有用到corejs时才使用
      {
        useBuiltIns: "usage",
        // corejs的版本
        corejs: 3
      }]
    // 用于编译React jsx语法的预设
    //'@babel/preset-react',
    // 用于编译TypeScript的预设
    //'@babel/preset-typescript'
  ],
};
