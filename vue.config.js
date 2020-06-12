const path = require('path')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

function resolve(dir) {
  return path.join(__dirname, dir)
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // 需要全局导入的less路径，自己修改，
        path.resolve(__dirname, './src/assets/less/common.less')
      ]
    })
}



const webpackConfig = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: process.env.outputDir,

  lintOnSave: false,
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    },
    resolve: {
      modules: [ // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
        resolve('src'),
        resolve('node_modules'),

      ],
      mainFields: ['main'], // 只采用main字段作为入口文件描述字段，减少搜索步骤
      alias: {
        vue$: "vue/dist/vue.common",
        "@": resolve("src") // 缓存src目录为@符号，避免重复寻址
      }
    },

  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://testcarapi.hileader.com',   // 将请求代理到这个基础路径
        changeOrigin: true,                // 开启跨域
        pathRewrite: {            // 重写请求路径
          '^/api': ''      //将以/api开头的地址的开头替换为 ''
        }
      },

    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  }
}


module.exports = webpackConfig
