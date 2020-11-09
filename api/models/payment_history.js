const Model = require('./Model');

class PaymentHistory extends Model {
  constructor() {
    super();
    this.tableName = 'payment_histories';

    this.validationSchema = {
      type: 'object',
      required: ['client_id', 'groomer_id', 'service_id', 'amount'],
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
        amount: { type: 'number' },
        payment_method: { type: 'string' },
        last4: { type: 'string' },
      },
    };
  }
}

module.exports = new PaymentHistory();
