var config = require('../config.js').scss;
var gulp = require('gulp');
var id = require('gulp-identity');
var merge = require('merge-stream');
var min = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

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
  var conf = config.compile;
  var initSourcemaps;
  var writeSourcemaps;

  if (conf.sourceMaps) {
    initSourcemaps = sourcemaps.init();
    writeSourcemaps = sourcemaps.write('.');
  } else {
    initSourcemaps = id();
    writeSourcemaps = id();
  }

  return gulp.src(conf.src)
    .pipe(sass())
    .pipe(initSourcemaps)
    .pipe(min({ compatibility: 'ie8' }))
    .pipe(writeSourcemaps)
    .pipe(gulp.dest(conf.dest));
});
