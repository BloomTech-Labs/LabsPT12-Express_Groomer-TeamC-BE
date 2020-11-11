const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Repository = require('./../models/Repository');
const PaymentHistory = require('./../models/payment_history');
const AS = require('./../models/appointment_service'); // AppointmentServiceModel
const AP = require('./../models/appointment'); // AppointmentModel
const services = require('../models/services');
const createHttpError = require('http-errors');

class PaymentRepository extends Repository {
  constructor() {
    super();
    this.model = PaymentHistory;
  }

  async beforeCreate(payload, params) {
    console.log(payload);
    try {
      // Get stripe token from payload, appointment id and the total price from the payload
      const { stripeToken, appointmentId, totalPrice } = payload;
      // Get authenticate user info from request in params
      const authUser = params.context.profile;

      /**
       * The appointment clientId should be the same with
       * the Id of the authenticate user. Order to check that
       * we are querying the appointments where the clientId equal to the Id
       * of the authenticated user profile in the request and where the appointmentId
       * is the same with the appointmentId in the payload
       */
      const appointment = await AP.query()
        .where({ client_id: authUser.id, id: appointmentId })
        .first();

      // if appointment is empty return error;
      if (!appointment)
        throw createHttpError(
          400,
          'We are not able to found the appointment information.'
        );

      /** check if the total amount is correct */
      // Start by making the total os services cost
      const BTotalPrice = await this.makeTotalPrice(appointment.id);
      // check if the backend total price correspond to one from the front-end
      // if not throw a 400 error
      if (BTotalPrice !== totalPrice)
        throw createHttpError(
          400,
          'The total price is not correct. Please check services cost.'
        );

      /** PROCESSING PAYMENT */
      // Create the stripe user to get the customerId needed for payment
      const customer = await stripe.customers.create({
        email: authUser.email,
        source: stripeToken,
      });
      // Charge the client
      const charge = await stripe.charges.create({
        amount: BTotalPrice * 100, // The amount is in cents
        description: 'Payment for grooming service.',
        currency: 'usd',
        customer: customer.id,
      });

      /** BUILD TO PAYMENT HISTORY TO BE SAVED */
      const paymentHistory = {
        appointment_id: appointment.id,
        payment_id: charge.id,
        amount: charge.amount,
        payment_method: `${charge.source.brand}-${charge.source.object}`,
        last4: charge.source.last4,
      };

      return paymentHistory;
    } catch (error) {
      console.log(error);
      throw createHttpError(error.statusCode || 500, error.message);
    }
  }

  async afterCreate(result) {
    return result[0];
  }

  async afterUpdate(result) {
    return result[0];
  }

  async makeTotalPrice(appointmentId) {
    const result = await AS.query()
      .where({ 'appointment_services.appointment_id': appointmentId })
      .join('services', 'services.id', 'appointment_services.service_id')
      .sum('services.cost')
      .first();

    return result.sum;
  }
}

module.exports = new PaymentRepository();
