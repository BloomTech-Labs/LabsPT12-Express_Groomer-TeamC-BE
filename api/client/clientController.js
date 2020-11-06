const Controller = require('./../controllers');
const ClientRepository = require('./clientRepository');
const AppointmentRepository = require('./../appointment/appointmentRepository');

class ClientController extends Controller {
  /**
   * Get list of all client appointments
   * @returns an array of all table entries
   * @param {object} req express request object
   * @param {object} res express response object
   */
  async getClientAppointments(req, res) {
    try {
      const { clientProfileId } = req.params;

      const appointments = await AppointmentRepository.getWhere({
        'appointments.client_id': clientProfileId,
      });

      if (!appointments)
        throw new createHttpError(
          404,
          `Appointments not found for client with id [$ clientProfileId}]`
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

module.exports = new ClientController(ClientRepository);
