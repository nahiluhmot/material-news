var config = require('../config.js').scss;
var gulp = require('gulp');
var id = require('gulp-identity');
var min = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

/**
 * Copy the static CSS to the public folder.
 */
gulp.task('scss', function() {
  var initSourcemaps;
  var writeSourcemaps;

  if (config.sourceMaps) {
    initSourcemaps = sourcemaps.init();
    writeSourcemaps = sourcemaps.write('.');
  } else {
    initSourcemaps = id();
    writeSourcemaps = id();
  }

  return gulp.src(config.src)
    .pipe(sass())
    .pipe(initSourcemaps)
    .pipe(min({ compatibility: 'ie8' }))
    .pipe(writeSourcemaps)
    .pipe(gulp.dest(config.dest));
});
