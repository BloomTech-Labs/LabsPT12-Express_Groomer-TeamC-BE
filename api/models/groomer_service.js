const Model = require('./Model');

class GroomerService extends Model {
  constructor() {
    super();
    this.tableName = 'groomer_services';

    this.validationSchema = {
      type: 'object',
      required: ['groomer_id', 'service_id', 'service_hours'],
      properties: {
        groomer_id: {
          type: 'string',
          oneOf: { key: 'profile_id', target: 'groomers' },
        },
        service_id: {
          type: 'string',
          oneOf: { key: 'id', target: 'services' },
        },
        service_hours: { type: 'string' },
      },
    };
  }
}

module.exports = new GroomerService();
