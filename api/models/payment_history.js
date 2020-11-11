const Model = require('./Model');

class PaymentHistory extends Model {
  constructor() {
    super();
    this.tableName = 'payment_histories';

    this.validationSchema = {
      type: 'object',
      required: [
        'payment_id',
        'appointment_id',
        'amount',
        'payment_method',
        'last4',
      ],
      properties: {
        appointment_id: {
          type: 'string',
          oneOf: { key: 'id', target: 'appointments' },
        },
        payment_id: { type: 'string' },
        amount: { type: 'number' },
        payment_method: { type: 'string' },
        last4: { type: 'string' },
      },
    };
  }
}

module.exports = new PaymentHistory();
