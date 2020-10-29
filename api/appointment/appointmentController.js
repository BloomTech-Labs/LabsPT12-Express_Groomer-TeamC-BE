const Controller = require('./../controllers');
const AppointmentRepository = require('./appointmentRepository');

class AppointmentController extends Controller {}

module.exports = new AppointmentController(AppointmentRepository);
