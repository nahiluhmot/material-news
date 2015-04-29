/**
 * Gracefully handle gulp errors.
 */
var logError = function(error) {
  console.log(error);
  this.emit('end');
};

module.exports = logError;
