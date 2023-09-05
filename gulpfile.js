const gulp = require("gulp");
const compiler = require("webpack");
const webpack = require("webpack-stream");
const named = require("vinyl-named");
const postcss = require("gulp-postcss");

/* ----------------------------------------- */
/*  Compile CSS
/* ----------------------------------------- */

const SYSTEM_SCSS = ["styles/**/*.css"];
/**
 * Compile CSS
 * @returns {object}
 */
function compileCss() {
  return gulp.src("styles/theme-glass.css").pipe(postcss()).pipe(gulp.dest("./build"));
}
const css = gulp.series(compileCss);

/* ----------------------------------------- */
/*  Compile Javascript
/* ----------------------------------------- */

const SYSTEM_JS = ["modules/**/*.js"];
/**
 * Compile JS
 * @returns {object}
 */
function compileJs() {
  return gulp
    .src(["modules/theme-glass.js"])
    .pipe(named())
    .pipe(webpack({ mode: "production" }, compiler))
    .pipe(gulp.dest("./build"));
}
const js = gulp.series(compileJs);

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

/**
 * Watch modifications
 */
function watchUpdates() {
  gulp.watch(SYSTEM_SCSS, css);
  gulp.watch(SYSTEM_JS, js);
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(compileCss, compileJs, watchUpdates);
exports.build = gulp.series(compileCss, compileJs);
exports.css = css;
exports.js = js;
