const db = require('./db-config');
const { Validator, SchemaError } = require('jsonschema');

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
    /** custom validations handler **/
    // validate full name
    const fullNameSchema = {
      id: '/fullName',
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
      },
    };
    this.validator.addSchema(fullNameSchema, '/fullName');
    // check if constraint foreign key exist in target table
    this.validator.attributes.oneOf = async (
      instance,
      schema,
      options,
      ctx
    ) => {
      // check type if instance
      if (typeof instance !== 'object') return;
      // check type of index
      if (typeof schema.oneOf !== 'object')
        throw new SchemaError("'oneOf' expects an object", schema);
      if (
        'key' in schema.oneOf &&
        'value' in schema.oneOf &&
        'target' in schema.oneOf
      ) {
        // check the key value pair exits in target table
        const response = await db(schema.oneOf.target).where({
          [schema.oneOf.key]: schema.oneOf.value,
        });
        // if not exists return error
        if (!response)
          return `${schema.oneOf.key} does not exist in ${schema.oneOf.target}`;
      } else {
        // throw error if schema missed of this attributes "key", "value", or "target"
        throw new SchemaError('"key", "value" or "target" are missing', schema);
      }
    };
  }

  /**
   * @returns {array} of rows in the table
   */
  async query() {
    return await db(this.tableName);
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
    const validated = this.validator.validate(payload, this.validationSchema);

    if (validated.errors.length) throw new ValidationError(v.errors);

    return await this.query().insert(payload).returning('*');
  }

  /**
   *
   * @param {string} id row reference to be updated
   * @param {object} payload  new data to persist
   * @returns {object} updated data
   */
  async update(id, payload) {
    const validated = this.validator.validate(payload, this.validationSchema);

    if (validated.errors.length) throw new ValidationError(v.errors);

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
