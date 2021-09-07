/**
 * App wide events
 */
function getAppEvent() {
  if (!global.appEvent) {
    const EventEmitter = require('events');
    const appEvent = new EventEmitter();
    global.appEvent = appEvent;
  }

  return global.appEvent;
}

/**
 * App http based error
 */
class AppError extends Error {
  constructor(code, message) {
    super();
    this.message = message;
    this.code = code;
  }

  static from(object) {
    if (!object || !object.code || !object.message) return new AppError(500, 'Something went wrong!');
    return new AppError(object.code, object.message);
  }
}

/**
 * App error handler
 */
function appErrorHandler(err, req, res, next) {
  if (!(err instanceof AppError)) err = AppError.from(err);
  res.status(err.code).json(err);
}

module.exports.getAppEvent = getAppEvent; 
module.exports.AppError = AppError; 
module.exports.appErrorHandler = appErrorHandler;
