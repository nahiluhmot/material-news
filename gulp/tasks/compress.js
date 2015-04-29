var config = require('../config.js').compress;
var gulp = require('gulp');
var gzip = require('gulp-gzip');

/**
 * Compress all of the production sources.
 */
gulp.task('compress', ['css', 'html', 'js', 'scss'], function() {
  return gulp.src(config.src)
    .pipe(gzip({ gzipOptions: { level: 9 } }))
    .pipe(gulp.dest(config.dest));
});
