module.exports = {
  theme: {
    extend: {
      fill: theme => ({
        current: 'current-color',
        ...theme('colors'),
      }),
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
