module.exports = class BusinessError extends Error {
  constructor(message, status) {
    super();
    this.name = 'BusinessError';
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.status = status || 500;
  }
}
