const Model = require('./Model');

class Groomer extends Model {
  constructor() {
    super();
    this.tableName = 'groomers';

    this.validationSchema = {
      type: 'object',
      required: ['profile_id', 'travel', 'travel_distance'],
      properties: {
        profile_id: {
          type: 'string',
          oneOf: { key: 'id', target: 'profiles' },
          unique: { target: this.tableName },
        },
        travel: { type: 'boolean' },
        travel_distance: { type: 'integer' },
        bio: { type: 'string' },
      },
    };
  }
}

module.exports = new Groomer();
