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
  transpileDependencies: true,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@store': resolve('src/store/modules')
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
