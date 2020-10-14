const Model = require('./Model');

class GroomerMedia extends Model {
  constructor() {
    super();
    this.tableName = 'groomer_medias';

    this.validationSchema = {
      type: 'object',
      required: ['groomer_id', 'url'],
      properties: {
        groomer_id: {
          type: 'string',
          oneOf: { key: 'profile_id', target: 'groomers' },
        },
        url: { type: 'string' },
        description: { type: 'string' },
      },
    };
  }
}

module.exports = new GroomerMedia();
