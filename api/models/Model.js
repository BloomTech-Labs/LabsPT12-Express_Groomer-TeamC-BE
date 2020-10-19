const uuid = require('uuid');
const knex = require('../../data/db-config');
const Validator = require('./Validator');

class Model {
  constructor() {
    this.tableName = null; // table name as in the databases
    this.validationSchema = {}; // validation schema to validate data
    this.validator = new Validator(knex); // validator instance
  }

  /** QUERY */
  /** knex root query
   * @returns {array} of rows in the table
   */
  query() {
    return knex(this.tableName);
  }

  /**
   * fill all rows in the database table
   * @returns {array} of rows in the table
   */
  async findAll() {
    return await this.query();
  }

  /**
   * Find one row in the database table by id
   * @param {string} id table primary key
   * @returns {object} first row corresponding to the id
   */
  async findById(id) {
    return await this.query().where({ id }).first();
  }

  /**
   * Persist data in a given database table
   * @param {object} payload data to be persist
   * @returns {object} created data
   */
  async create(payload) {
    if (!(await this.validator.validate(payload, this.validationSchema)))
      return this.validator.errors;
    const data = {
      id: uuid.v4(),
      ...this.validator.validatedData,
    };
    return await this.query().insert(data).returning('*');
  }

  /**
   * Update row table in the database by id
   * @param {string} id row reference to be updated
   * @param {object} payload  new data to persist
   * @returns {object} updated data
   */
  async update(id, payload) {
    if (
      !(await this.validator.validate(payload, this.validationSchema, {
        context: this,
        method: 'update',
      }))
    )
      return this.validator.errors;
    const data = this.validator.validatedData;
    return await this.query().where({ id }).update(data).returning('*');
  }

  /**
   * Delete row in the table by id
   * @param {string} id row reference to be deleted
   * @returns {string} deleted id
   */
  async remove(id) {
    await this.query().where({ id }).del();
    return id;
  }
}

module.exports = Model;
