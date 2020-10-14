const Model = require('../Model');

class Profile extends Model {
  constructor() {
    super();
    this.tableName = 'profiles';
    this.validationSchema = {
      id: '/Profile',
      type: 'object',
      required: ['email', 'name', 'user_type'],
      properties: {
        email: { type: 'email' },
        name: { $ref: '/fullName' },
        user_type: { type: 'string' },
        avatarUrl: { type: 'string' },
        phone: { type: 'string', maximum: 13 },
        address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip_code: { type: 'integer' },
        country: { type: 'string' },
      },
    };
  }
}

module.exports = new Profile();
