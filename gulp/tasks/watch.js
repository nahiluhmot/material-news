var config = require('../config.js');
var gulp = require('gulp');

/**
 * Watch the sources and rebuild the assets when they change.
 */
gulp.task('watch', ['build'], function() {
  var scss = config.scss.copy.map(function(conf) {
    return conf.src;
  });

  gulp.watch(config.html.src, ['html']);
  gulp.watch(config.js.compile.src, ['js']);
  gulp.watch(scss, ['scss']);
});
