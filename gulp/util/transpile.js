var changed = require('gulp-changed');
var gulp = require('gulp');
var logError = require('./log-error.js');
var transpiler = require('gulp-babel');

/**
 * Transfile the es6 modules in src to dest.
 */
var transpile = function(src, dest, opts) {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(transpiler(opts || {}))
    .on('error', logError)
    .pipe(gulp.dest(dest));
};

module.exports = transpile;
