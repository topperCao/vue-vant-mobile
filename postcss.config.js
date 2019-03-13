module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    // px自动转rem 默认按设计图尺寸750
    'postcss-pxtorem': {
      rootValue: 75,
      propList: ['*']
    }
  }
}
