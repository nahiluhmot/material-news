var config = require('../config.js').html;
var gulp = require('gulp');

/**
 * Copy the static html to the public folder.
 */
gulp.task('html', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
