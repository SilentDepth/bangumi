module.exports = {
  devServer: {
    proxy: {
      '^/oauth/access_token': {
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
