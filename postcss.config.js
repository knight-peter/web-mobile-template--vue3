module.exports = {
  plugins: {
    autoprefixer: {
      grid: true,
    },
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue(/* { file } */) {
        // return file.indexOf('vant') !== -1 ? 37.5 : 75;
        return 37.5;
      },
      propList: ['*'],
    },
  },
};
