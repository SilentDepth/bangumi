module.exports = {
  theme: {
    extend: {
      fill: theme => ({
        current: 'currentColor',
        ...theme('colors'),
      }),
      right: {
        full: '100%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
