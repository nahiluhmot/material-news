var bundle = require('../util/bundle.js');
var config = require('../config.js').js;
var gulp = require('gulp');
var minify = require('../util/minify-js.js');
var transpile = require('../util/transpile.js');
var concat = require('gulp-concat');

/**
 * Transpile and minify and all of the JavaScript.
 */
gulp.task('js', ['js:concat']);

gulp.task('js:compile', function() {
  return transpile(config.compile.src, config.compile.dest, {
    modules: config.compile.modules
  });
});

gulp.task('js:bundle', ['js:compile'], function() {
  var conf = config.bundle;

  return bundle(conf.src, conf.dest, conf.file, conf.paths);
});

gulp.task('js:min', ['js:bundle'], function() {
  return minify(config.min.src, config.min.dest);
});

gulp.task('js:concat', ['js:min'], function() {
  return gulp.src(config.concat.src)
    .pipe(concat(config.concat.name))
    .pipe(gulp.dest(config.concat.dest));
});
