module.exports = {
  theme: {
    extend: {
      fill: theme => ({
        current: 'currentColor',
        ...theme('colors'),
      }),
      fontFamily: {
        sans: [
          '-apple-system',
          'Noto Sans',
          'Helvetica Neue',
          'Helvetica',
          'Nimbus Sans L',
          'Arial',
          'Liberation Sans',
          'PingFang SC',
          'Hiragino Sans GB',
          'Noto Sans CJK SC',
          'Source Han Sans SC',
          'Source Han Sans CN',
          'Microsoft YaHei',
          'Wenquanyi Micro Hei',
          'WenQuanYi Zen Hei',
          'ST Heiti',
          'SimHei',
          'WenQuanYi Zen Hei Sharp',
          'sans-serif',
        ],
      },
      right: {
        full: '100%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
