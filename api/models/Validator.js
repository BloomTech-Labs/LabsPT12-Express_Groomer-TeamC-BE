const jsonschema = require('jsonschema');

class Validator {
  constructor(knexInstance) {
    this.knex = knexInstance;
    this.validator = new jsonschema.Validator();
    this.validatedData = {};
    this.errors = [];
    this.setAttributes();
  }

  addSchema(schema, id) {
    this.validator.addSchema(schema, id);
  }

  setAttributes() {
    // check if constraint foreign key exist in target table
    this.validator.attributes.oneOf = async (
      instance,
      schema,
      options,
      ctx
    ) => {
      // check type of index
      if (typeof schema.oneOf !== 'object')
        throw new jsonschema.SchemaError("'oneOf' expects an object", schema);
      if ('key' in schema.oneOf && 'target' in schema.oneOf) {
        return true;
      } else {
        // throw error if schema missed of this attributes "key" or "target"
        throw new jsonschema.SchemaError(
          '"key" or "target" are missing',
          schema
        );
      }
    };
    // check if the instance value is unique
    this.validator.attributes.unique = async (
      instance,
      schema,
      options,
      ctx
    ) => {
      // check type of index
      if (typeof schema.unique !== 'object')
        throw new jsonschema.SchemaError("'oneOf' expects an object", schema);
      if ('target' in schema.unique) {
        return true;
      } else {
        // throw error if schema missed of this attributes "key" or "target"
        throw new jsonschema.SchemaError(
          '"key" or "target" are missing',
          schema
        );
      }
    };
  }

  async validate(data, schema, params = { context: null, method: null }) {
    this._validate(data, schema);
    if (this.errors.length > 0) return false;
    /**
     * check if there are custom attributes that db call
     */
    for (const key of Object.keys(schema.properties)) {
      for (const attr of Object.keys(schema.properties[key])) {
        let obj;
        switch (attr) {
          case 'oneOf':
            obj = schema.properties[key][attr];
            await this._oneOf(
              obj.target,
              obj.key,
              this.validatedData[key],
              key
            );
            break;
          case 'unique':
            obj = schema.properties[key][attr];
            await this._unique(
              obj.target,
              key,
              this.validatedData[key],
              params.method
            );
            break;
        }
      }
    }
    if (this.errors.length > 0) return false;
    return true;
  }

  _validate(data, schema) {
    const validated = this.validator.validate(data, schema);
    if (validated.errors.length > 0) return (this.errors = validated.errors);
    this.validatedData = validated.instance;
  }

  /** CUSTOM VALIDATION */

  async _oneOf(target, key, value, field) {
    const response = await this.knex(target).where({ [key]: value });

    if (!response.length) {
      this.errors = [
        ...this.errors,
        {
          detail: `[${field}] with value: [${value}] does not exists in table: [${target}], column: [${key}]`,
        },
      ];
      return false;
    }
  }

  async _unique(target, key, value, method = null) {
    const response = await this.knex(target).where({ [key]: value });

    if (response.length > 0 && method !== 'update') {
      this.errors = [
        ...this.errors,
        {
          detail: `${key}: [${value}] already exists.`,
        },
      ];
      return false;
    }
  }
}

module.exports = Validator;
