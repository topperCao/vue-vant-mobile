module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    // px自动转rem 默认按设计图尺寸375
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*', '!font*'],
      minPixelValue: 2
    }
  }
}
