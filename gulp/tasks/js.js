var bundle = require('../util/bundle.js');
var config = require('../config.js').js;
var gulp = require('gulp');
var minify = require('../util/minify-js.js');
var transpile = require('../util/transpile.js');

/**
 * Transpile and minify and all of the JavaScript.
 */
gulp.task('js', ['js:min']);

gulp.task('js:compile', function() {
  return transpile(config.compile.src, config.compile.dest, {
    modules: config.compile.modules
  });
});

gulp.task('js:bundle', ['js:compile'], function() {
  var conf = config.bundle;

  return bundle(conf.src, conf.dest, conf.file, conf.paths);
});

gulp.task('js:min', ['js:bundle'], function() {
  var maps = config.sourceMaps;
  return minify(config.min.name, config.min.src, config.min.dest, maps);
});
