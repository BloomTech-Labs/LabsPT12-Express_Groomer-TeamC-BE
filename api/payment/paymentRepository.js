const Repository = require('./../models/Repository');
const PaymentHistory = require('./../models/payment_history');

class PaymentRepository extends Repository {
  constructor() {
    super();
    this.model = PaymentHistory;
  }

  async afterCreate(result) {
    return result[0];
  }

  async afterUpdate(result) {
    return result[0];
  }
}

module.exports = new PaymentRepository();
