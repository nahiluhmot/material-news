var browserify = require('browserify');
var config = require('../config.js').js;
var gulp = require('gulp');
var logError = require('../util/log-error.js');
var minify = require('../util/minify-js.js');
var source = require('vinyl-source-stream');
var transpile = require('../util/transpile.js');

/**
 * Transpile and minify and all of the JavaScript.
 */
gulp.task('js', ['js:min', 'js:vendored']);

gulp.task('js:compile', function() {
  return transpile(config.compile.src, config.compile.dest, {
    modules: config.compile.modules
  });
});

gulp.task('js:bundle', ['js:compile'], function() {
  return browserify({ entries: config.bundle.src, paths: config.bundle.paths })
    .bundle()
    .pipe(source(config.bundle.file))
    .on('error', logError)
    .pipe(gulp.dest(config.bundle.dest));
});

gulp.task('js:min', ['js:bundle'], function() {
  return minify(config.min.src, config.min.dest, config.sourceMaps);
});

gulp.task('js:vendored', function()  {
  return minify(config.vendored.src, config.vendored.dest, config.sourceMaps);
});
