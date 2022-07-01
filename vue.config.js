const { defineConfig } = require('@vue/cli-service')

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'expert scoring admin'

module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    port: 8006,
    // open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    proxy: {
      // 配置跨域
      '/dev-api': {
        target: 'http://192.168.0.120:8086', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  },
  runtimeCompiler: true,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      },
    },
    plugins: [new NodePolyfillPlugin()]
  },
  // chainWebpack: (config) => {
  //   config.plugin('AutoImport').use(
  //     AutoImport({
  //       resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
  //     })
  //   )
  //   config.plugin('Components').use(
  //     Components({
  //       resolvers: [ElementPlusResolver({ importStyle: true })]
  //     })
  //   )
  // }
})
