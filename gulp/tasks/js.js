var bundle = require('../util/bundle.js');
var config = require('../config.js').js;
var gulp = require('gulp');
var minify = require('../util/minify-js.js');
var transpile = require('../util/transpile.js');
var concat = require('gulp-concat');

/**
 * Transpile and minify and all of the JavaScript.
 */
gulp.task('js', ['js:maps', 'js:concat']);

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
  return minify(
    config.min.src,
    config.min.dest,
    config.min.sourceMaps
  );
});

gulp.task('js:vendored', function() {
  return minify(config.vendored.src, config.vendored.dest);
});

gulp.task('js:maps', ['js:min', 'js:vendored'], function() {
  return gulp.src(config.maps.src)
    .pipe(gulp.dest(config.maps.dest));
});

gulp.task('js:concat', ['js:min', 'js:vendored'], function() {
  return gulp.src(config.concat.src)
    .pipe(concat(config.concat.name))
    .pipe(gulp.dest(config.concat.dest));
});
