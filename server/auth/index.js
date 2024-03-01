const authentication = require('./authentication');
const { authorization } = require('./authorization');
const errorHandler = require('./errorhandler');

module.exports = {
  errorHandler,
  authentication,
  authorization,
};
