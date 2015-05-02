var config = require('../config.js').scss;
var gulp = require('gulp');
var id = require('gulp-identity');
var merge = require('merge-stream');
var min = require('gulp-minify-css');
var sass = require('gulp-sass');

/**
 * Compile the SCSS sources.
 */
gulp.task('scss', ['scss:compile']);

/**
 * Copy the applictaion sources to the build dir.
 */
gulp.task('scss:copy', function() {
  var streams = config.copy.map(function(conf) {
    return gulp.src(conf.src)
      .pipe(gulp.dest(conf.dest));
  });

  return merge(streams);
});

/**
 * Copy the vendored sources to the build dir.
 */
gulp.task('scss:compile', ['scss:copy'], function() {
  return gulp.src(config.compile.src)
    .pipe(sass())
    .pipe(min({ compatibility: 'ie8' }))
    .pipe(gulp.dest(config.compile.dest));
});
