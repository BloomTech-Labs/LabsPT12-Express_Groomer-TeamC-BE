const Controller = require('./../controllers');
const AppointmentRepository = require('./appointmentRepository');

class AppointmentController extends Controller {
  async post(req, res) {
    try {
      // Separate services from others info to validate data
      const { services, ...bodyRest } = req.body;
      // controller repository [appointmentRepository]
      const repository = this.repository;

      if (!(await repository.model.validateData(bodyRest)))
        return res.status(400).json(repository.model.validator.errors);

      // check if services exists and is an array
      if (!services || !Array.isArray(services))
        return res
          .status(400)
          .json({ detail: '"services" is required and should be array type.' });

      return super.post(req, res);
    } catch (error) {
      console.log(error);
      // get the correct error status code
      // by checking the instance of the error
      const statusCode = error.statusCode || 500;
      // return error if error with status 404 or 500
      return res.status(statusCode).json({ message: error.message });
    }
  }
}

module.exports = new AppointmentController(AppointmentRepository);
