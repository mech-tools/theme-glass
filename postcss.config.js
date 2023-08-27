module.exports = {
  plugins: [
    require("postcss-import"),
    require("stylelint"),
    require("postcss-mixins"),
    require("postcss-simple-vars"),
    require("postcss-hexrgba"),
    require("postcss-preset-env")({ stage: 1 }),
    require("cssnano")
  ]
};
