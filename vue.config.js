const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // 基础路径，./相对路径 /绝对路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 打包输出的文件夹名
  outputDir: 'dist',
  // 打包后的css和js等静态资源路径，相对于outputDir
  assetsDir: '',
  // 打包后的index.html路径，相对于outputDir
  indexPath: 'index.html',
  // 静态资源文件名是否包含hash，用于缓存
  filenameHashing: 'true',
  // 多页面入口配置
  pages: undefined,
  // 保存时是否lint校验代码
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 是否使用运行时编译版vue
  runtimeCompiler: false,
  // node_modules中要使用babel-loader编译的模块
  transpileDependencies: [],
  // 生产环境是否生成source map
  productionSourceMap: false,
  // 设置生成的link和script标签的crossorigin属性，用于CORS跨域
  crossorigin: undefined,
  // 设置生成的link和script标签是否启用SRI，用于提升cdn安全性
  integrity: false,

  // 通过webpack-merge修改webpack配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      const myPlugins = [
        // 配置js压缩插件
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // 移除所有console.语句
              drop_console: true
            }
          },
          // 使用多进程并行运行提高构建速度
          parallel: true
        })
      ]
      config.plugins = [...config.plugins, ...myPlugins]
    }
  },

  // 通过webpack-chain修改webpack配置
  chainWebpack: config => {},

  // css相关配置
  css: {
    // 是否启用开箱即用的css module
    modules: true,
    // 是否将css从js里分离出来
    extract: true,
    // 是否开启css的source map
    sourceMap: false,
    // css预设器配置
    loaderOptions: {}
  },

  // 开发环境服务配置
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hot: true,
    open: false,
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://192.168.106.191:8380',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  // 第三方插件配置
  pluginOptions: {}
}
