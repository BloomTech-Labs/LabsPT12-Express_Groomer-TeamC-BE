const Model = require('./Model');

class Profile extends Model {
  constructor() {
    super();
    this.tableName = 'profiles';
    /** VALIDATION */
    const fullNameSchema = {
      id: '/fullName',
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
      },
    };
    this.validator.addSchema(fullNameSchema, '/fullName');
    this.validationSchema = {
      id: '/Profile',
      type: 'object',
      required: ['email', 'name', 'user_type'],
      properties: {
        email: { 
          type: 'string', 
          unique: { target: this.tableName }, 
          format: "email"
        },
        name: { type: "string" },
        user_type: { type: 'string', oneOf: {key: "id", target: "user_types"} },
        avatarUrl: { type: 'string' },
        phone: { type: 'string', maxLength: 17 },
        address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip_code: { type: 'integer'},
        country: { type: 'string' },
      },
    };
  }
}

module.exports = new Profile();
