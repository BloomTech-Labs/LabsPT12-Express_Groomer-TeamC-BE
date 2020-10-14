const Model = require('./Model');

class Rating extends Model {
  constructor() {
    super();
    this.tableName = 'ratings';
    this.validationSchema = {
      type: 'object',
      required: ['user_id', 'rating'],
      properties: {
        user_id: { type: 'string', oneOf: { key: 'id', target: 'profiles' } },
        ratings: { type: 'number' },
      },
    };
  }
}

module.exports = new Rating();
