const Model = require('./Model');

class Comment extends Model {
  constructor() {
    super();
    this.tableName = 'comments';

    this.validationSchema = {
      type: 'object',
      required: ['author', 'groomer_id', 'body'],
      properties: {
        author: { type: 'string', oneOf: { key: 'id', target: 'profiles' } },
        groomer_id: {
          type: 'string',
          oneOf: { key: 'profile_id', target: 'groomers' },
        },
        body: { type: 'string' },
      },
    };
  }
}

module.exports = new Comment();
