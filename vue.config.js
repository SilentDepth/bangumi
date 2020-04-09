module.exports = {
  devServer: {
    proxy: {
      '^/oauth': {
        target: 'https://bgm.tv',
        changeOrigin: true,
      },
      '^/api': {
        target: 'https://api.bgm.tv',
        pathRewrite: {'^/api': ''},
        changeOrigin: true,
      },
    },
  },
}
