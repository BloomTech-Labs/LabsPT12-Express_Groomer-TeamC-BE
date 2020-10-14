const Model = require('./Model');

class Services extends Model {
  constructor() {
    super();
    this.tableName = 'services';

    this.validationSchema = {
      type: 'object',
      required: ['name', 'cost'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        cost: { type: 'number' },
      },
    };
  }
}

module.exports = Services;
