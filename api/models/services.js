const Model = require('./Model');

class Service extends Model {
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

module.exports = new Service();
