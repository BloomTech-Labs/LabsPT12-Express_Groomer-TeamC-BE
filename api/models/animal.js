const Model = require('./Model');

class Animal extends Model {
  constructor() {
    super();
    this.tableName = 'animals';

    this.validationSchema = {
      type: 'object',
      required: ['owner_id', 'name', 'animal_type', 'breed'],
      properties: {
        owner_id: { type: 'string', oneOf: { key: 'id', target: 'profiles' } },
        name: { type: 'string' },
        animal_type: { type: 'string' },
        breed: { type: 'string' },
        weight: { type: 'string' },
        picture: { type: 'string', format: 'uri' },
        comment: { type: 'string' },
      },
    };
  }
}

module.exports = new Animal();
