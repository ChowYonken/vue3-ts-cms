const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:4000', //代理服务器把请求转发给http://152.136.185.210:5000(真正的后台服务器)
        //真正的服务器没有/api，所以要重写路径置空，否则找不到相应的路径
        pathRewrite: {
          //匹配以api开头的路径置空
          '^/api': ''
        },
        changeOrigin: true //用于控制请求头中的host值
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
})
