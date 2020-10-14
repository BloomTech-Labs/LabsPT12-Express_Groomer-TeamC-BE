const uuid = require('uuid');
const knex = require('./db-config');
const Validator = require('./Validator');

class Model {
  constructor() {
    this.tableName = null; // table name as in the databases
    this.validationSchema = {}; // validation schema to validate data
    this.validator = new Validator(knex); // validator instance
  }

  /** QUERY */
  /**
   * @returns {array} of rows in the table
   */
  async query() {
    return await knex(this.tableName);
  }

  /**
   * @returns {array} of rows in the table
   */
  async findAll() {
    return await this.query();
  }

  /**
   *
   * @param {string} id table primary key
   * @returns {object} first row corresponding to the id
   */
  async findById(id) {
    return await this.query().where({ id }).first();
  }

  /**
   *
   * @param {object} payload data to be persist
   * @returns {object} created data
   */
  async create(payload) {
    if (!(await this.validator.validate(payload, this.validationSchema)))
      return this.validator.errors;
    const data = this.validator.validatedData;
    return await this.query().insert(data).returning('*');
  }

  /**
   *
   * @param {string} id row reference to be updated
   * @param {object} payload  new data to persist
   * @returns {object} updated data
   */
  async update(id, payload) {
    if (!(await this.validator.validate(payload, this.validationSchema)))
      return this.validator.errors;
    const data = this.validator.validatedData;
    return await this.query().where({ id }).update(payload).returning('*');
  }

  /**
   *
   * @param {string} id row reference to be deleted
   * @returns {string} deleted id
   */
  async remove(id) {
    return await this.query().where({ id }).del();
  }
}

module.exports = Model;
