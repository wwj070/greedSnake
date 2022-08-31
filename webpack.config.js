// 引入一个包
const path = require('path')
// 引入HTML插件
const htmlWebpackPlugin = require('html-webpack-plugin')
// 引入clean组件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { postcss } = require('postcss-preset-env')

// webpack中的所有配置信息都应该写在module.exports中
module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所有目录
  output: {
    //  指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件名
    filename: 'bundle.js',
    environment: {
      // 告诉webpack不使用箭头
      arrowFunction: false,
      const: false
    }
  },
  resolve: {
    extensions: ['.js', '.css', '.json', '.ts']
  },
  // webpack打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效文件
        test: /\.ts$/,
        // 要使用的loder
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // targets 要兼容的目标浏览器版本
                    targets: {
                      "chrome": "58",
                      "ie": "11"
                    },
                    // 指定corejs版本
                    corejs: {
                      version: 3,
                    },
                    // 使用corejs的方式  'usage'表示按需加载
                    useBuiltIns: "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node_modules/
      },
      {
        // 设置less文件的处理
        test: /\.less$/,
        use: [
          // 从下往上执行
          'style-loader',
          'css-loader',
          // 引入postcss
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [[
                  "postcss-preset-env",
                  {
                    browsers: 'last 2 versions'
                  }
                ]]
              }
            }
          },
          'less-loader']
      }
    ]
  },
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 默认会创建/复制一个空的html文件，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new htmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin()
  ],
  mode: 'development',
  devServer: {
    // 项目构建后路径
    // contentBase: resolve(__dirname, 'build'), webpack5不支持
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 8000,
    // 自动打开浏览器
    open: true,
    hot: true
  },
  target: 'web'
}