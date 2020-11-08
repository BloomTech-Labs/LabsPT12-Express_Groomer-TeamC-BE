const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Repository = require('./../models/Repository');
const PaymentHistory = require('./../models/payment_history');
const 

class PaymentRepository extends Repository {
  constructor() {
    super();
    this.model = PaymentHistory;
  }

  async beforeCreate(payload) {
    const { stripeToken, ...services } = payload;

    const customer = await stripe.customers.create({
      email: require.profile.email,
      source: stripeToken,
    });

    const charge = await stripe.charges.create({
      amount: cart.amount,
      description: 'Service',
      currency: 'usd',
      customer: customer.id,
    });

    console.log(customer);

    console.log(charge);

    return cart;
  }

  async afterCreate(result) {
    return result[0];
  }

  async afterUpdate(result) {
    return result[0];
  }
}

module.exports = new PaymentRepository();
