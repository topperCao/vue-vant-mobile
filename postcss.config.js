module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    // px自动转rem 默认按设计图尺寸375
    'postcss-plugin-px2rem': {
      rootValue: 37.5,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      exclude: false,
      selectorBlackLis: ['noRem'],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 2
    }

  }
}
