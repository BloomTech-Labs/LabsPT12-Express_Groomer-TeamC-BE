class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = 400;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = NotFound;
