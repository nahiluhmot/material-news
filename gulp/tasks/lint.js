var config = require('../config.js').lint;
var gulp = require('gulp');
var jshint = require('gulp-jshint');

/**
 * Run the code quality metrics.
 */
gulp.task('lint', function() {
  return gulp.src(config.src)
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter(config.reporter));
});
