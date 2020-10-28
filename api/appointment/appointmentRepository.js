const Repository = require("./../models/Repository");
const Appointment = require("./../models/appointment");

class AppointmentRepository extends Repository {
    constructor() {
        super()
        this.model = Appointment
    }
}

module.exports = new AppointmentRepository()