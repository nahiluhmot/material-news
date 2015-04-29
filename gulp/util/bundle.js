var browserify = require('browserify');
var gulp = require('gulp');
var logError = require('./log-error.js');
var source = require('vinyl-source-stream');

module.exports = function(src, dest, file, paths) {
  return browserify({ entries: src, paths: paths })
    .bundle()
    .pipe(source(file))
    .on('error', logError)
    .pipe(gulp.dest(dest));
};
