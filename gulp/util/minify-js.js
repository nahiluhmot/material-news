var changed = require('gulp-changed');
var gulp = require('gulp');
var id = require('gulp-identity');
var logError = require('./log-error.js');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

/**
 * Minify es5 with a flag to enable/disable source maps.
 */
var minifyJS = function(src, dest, sourceMaps) {
  var initSourcemaps;
  var writeSourcemaps;

  if (sourceMaps) {
    initSourcemaps = sourcemaps.init();
    writeSourcemaps = sourcemaps.write('.');
  } else {
    initSourcemaps = id();
    writeSourcemaps = id();
  }

  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(initSourcemaps)
    .pipe(uglify())
    .pipe(writeSourcemaps)
    .on('error', logError)
    .pipe(gulp.dest(dest));
};

module.exports = minifyJS;
