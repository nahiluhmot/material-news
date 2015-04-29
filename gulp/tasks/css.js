var config = require('../config.js').css;
var gulp = require('gulp');
var min = require('gulp-minify-css');

/**
 * Copy the static CSS to the public folder.
 */
gulp.task('css', ['css:vendored']);

gulp.task('css:vendored', function() {
  return gulp.src(config.src)
    .pipe(min({ compatibility: 'ie8' }))
    .pipe(gulp.dest(config.dest));
});
