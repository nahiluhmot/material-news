var config = require('../config.js').clean;
var gulp = require('gulp');
var rimraf = require('rimraf');

/**
 * Remove the built assets.
 */
gulp.task('clean', function(cb) {
  return rimraf(config.dir, cb);
});
