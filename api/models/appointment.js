const Model = require('./Model');

class Appointment extends Model {
  constructor() {
    super();
    this.tableName = 'appointments';

    this.validationSchema = {
      type: 'object',
      required: [
        'client_id',
        'groomer_id',
        'service_id',
        'animal_id',
        'appointment_date',
        'location',
      ],
      properties: {
        client_id: { type: 'string', oneOf: { key: 'id', target: 'profiles' } },
        groomer_id: {
          type: 'string',
          oneOf: { key: 'profile_id', target: 'groomers' },
        },
        service_id: {
          type: 'string',
          oneOf: { key: 'id', target: 'groomer_services' },
        },
        animal_id: { type: 'string', oneOf: { key: 'id', target: 'animals' } },
        appointment_date: { type: 'string', format: 'date-time' }, // 2018-11-13T20:20:39+00:00
        location: { type: 'string' },
      },
    };
  }
}

module.exports = new Appointment();
