module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...process.env.NODE_ENV !== 'production' ? {} : {'@fullhuman/postcss-purgecss': {
      content: [
        './src/**.html',
      ],
      defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
    }},
  },
}
