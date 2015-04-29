var config = require('../config.js').fonts;
var gulp = require('gulp');

/**
 * Copy the vendored fonts to the public folder.
 */
gulp.task('fonts', ['fonts:vendored']);

gulp.task('fonts:vendored', function() {
  return gulp.src(config.vendored.src)
    .pipe(gulp.dest(config.vendored.dest));
});
