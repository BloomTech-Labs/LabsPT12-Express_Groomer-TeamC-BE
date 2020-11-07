const Controller = require('./../controllers');
const PaymentRepository = require('./paymentRepository');

class PaymentController extends Controller {}

module.exports = new PaymentController(PaymentRepository);
