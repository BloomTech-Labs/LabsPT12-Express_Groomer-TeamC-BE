const Model = require('./Model');

class AppointmentService extends Model {
  constructor() {
    super();
    this.tableName = 'appointment_services';

    this.validationSchema = {
      type: 'array',
      items: {
        required: ['appointment_id', 'service_id'],
        properties: {
          appointment_id: {
            type: 'string',
            oneOf: { key: 'id', target: 'appointments' },
          },
          service_id: {
            type: 'string',
            oneOf: { key: 'id', target: 'services' },
          },
        },
      },
    };
  }
}

module.exports = new AppointmentService();
