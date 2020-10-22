class UnauthorizedUser extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = 403;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = UnauthorizedUser;
