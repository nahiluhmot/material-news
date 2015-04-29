var gulp = require('gulp');

/**
 * Build the application.
 */
gulp.task('build', ['compress', 'fonts', 'html', 'js', 'scss']);
