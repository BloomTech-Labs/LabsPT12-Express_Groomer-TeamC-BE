const Controller = require('./../controllers');
const PaymentRepository = require('./paymentRepository');

class PaymentController extends Controller {
  async getTotalPrice(req, res) {
    try {
      const appointmentId = req.params.appointmentId;
      const totalPrice = await this.repository.makeTotalPrice(appointmentId);

      res.status(200).json({ appointmentId, totalPrice });
    } catch (error) {
      console.log(error);
      // get the correct error status code
      // by checking the instance of the error
      const statusCode = error.errorCode || error.statusCode || 500;
      // return error if error with status 404 or 500
      return res.status(statusCode).json({ message: error.message });
    }
  }
}

module.exports = new PaymentController(PaymentRepository);
