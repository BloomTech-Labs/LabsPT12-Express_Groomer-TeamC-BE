const Controller = require('../controllers');
const GroomerRepository = require('./groomerRepository');
const AppointmentRepository = require('./../appointment/appointmentRepository');
const createHttpError = require('http-errors');

class GroomerController extends Controller {
  /**
   * Get list of all groomer appointments
   * @returns an array of all table entries
   * @param {object} req express request object
   * @param {object} res express response object
   */
  async getGroomerAppointments(req, res) {
    try {
      const { groomerProfileId } = req.params;

      const appointments = await AppointmentRepository.getWhere({
        'appointments.groomer_id': groomerProfileId,
      });

      if (!appointments)
        throw new createHttpError(
          404,
          `Appointments not found for groomer with id [${groomerProfileId}]`
        );

      res.status(200).json(appointments);
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

module.exports = new GroomerController(GroomerRepository);
