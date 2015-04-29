var gulp = require('gulp');

/**
 * Build the application.
 */
gulp.task('build', ['compress', 'css', 'fonts', 'html', 'js', 'scss']);
