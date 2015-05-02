var changed = require('gulp-changed');
var gulp = require('gulp');
var id = require('gulp-identity');
var logError = require('./log-error.js');
var uglify = require('gulp-uglify');

/**
 * Minify es5 with a flag to enable/disable source maps.
 */
var minifyJS = function(src, dest) {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(uglify())
    .on('error', logError)
    .pipe(gulp.dest(dest));
};

module.exports = minifyJS;
