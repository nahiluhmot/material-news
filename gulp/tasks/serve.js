var config = require('../config.js').serve;
var gulp = require('gulp');
var serve = require('gulp-webserver');

/**
 * Serve the application.
 */
gulp.task('serve', ['watch'], function() {
  return gulp.src(config.src)
    .pipe(serve({
      port: config.port,
      open: false,
      host: '0.0.0.0',
      fallback: 'index.html',
      middleware: function(request, response, done) {
        response.setHeader('Access-Control-Allow-Origin', config.crossOrigin);
        done();
      }
    }));
});
