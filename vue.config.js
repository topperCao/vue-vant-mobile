const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const proxyPath = {
  path: 'http://192.168.106.191:8380'
}

module.exports = {
  // ./相对路径 /绝对路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  // 打包后的css和js等静态资源路径，相对于outputDir
  assetsDir: '',
  // 打包后的index.html路径，相对于outputDir
  indexPath: 'index.html',
  // 静态资源文件名是否包含hash，用于缓存
  filenameHashing: 'true',
  // 多页面配置
  pages: undefined,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 开发环境服务配置
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    open: false,
    proxy: {
      '/api': {
        target: proxyPath.path,
        // 是否代理websockets
        ws: true,
        // 是否需要虚拟主机服务
        changeOrigin: true,
        // 请求路径改写
        pathRewrite: { '^/api': '' }
      }
    }
  },

  // 通过webpack-merge修改webpack配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      const myPlugins = [
        // js压缩插件
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

  // 第三方插件配置
  pluginOptions: {}
}
