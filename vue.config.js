module.exports = {
   devServer: {
    // 前端请求的链接
    host: '192.168.8.35',
    // 前端请求的端口
    port: 3002,
    // 代理
    // proxy: {
    //   '/': {
    //     target: 'http://127.0.0.1:8099',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/': '/'
    //     }
    //   }
    // }
  },
   publicPath:'/',
   lintOnSave:false,
}