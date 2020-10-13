const db = require('./db-config');
const { Validator } = require('jsonschema');

class ValidationError extends Error {
  constructor(data, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = 'ValidationError';
    this.data = data;
  }
}

class Model {
  constructor() {
    this.tableName = null; // table name as in the databases
    this.validationSchema = {}; // validation schema to validate data
    this.validator = new Validator(); // validator instance
  }

  /**
   * @returns {array} of rows in the table
   */
  query() {
    return db(this.tableName);
  }

  /**
   * @returns {array} of rows in the table
   */
  findAll() {
    return this.query();
  }

  /**
   *
   * @param {string} id table primary key
   * @returns {object} first row corresponding to the id
   */
  findById(id) {
    return this.query().where({ id }).first();
  }

  /**
   *
   * @param {object} payload data to be persist
   * @returns {object} created data
   */
  create(payload) {
    const validated = this.validator.validate(payload, this.validationSchema);

    if (validated.errors.length) throw new ValidationError(v.errors);

    return this.query().insert(payload).returning('*');
  }

  /**
   *
   * @param {string} id row reference to be updated
   * @param {object} payload  new data to persist
   * @returns {object} updated data
   */
  update(id, payload) {
    const validated = this.validator.validate(payload, this.validationSchema);

    if (validated.errors.length) throw new ValidationError(v.errors);

    return this.query().where({ id }).update(payload).returning('*');
  }

  /**
   *
   * @param {string} id row reference to be deleted
   * @returns {string} deleted id
   */
  remove(id) {
    return this.query().where({ id }).del();
  }
}

module.exports = Model;
