const Repository = require('./../models/Repository');
const AS = require('../models/appointment_service'); // AppointmentService Model
const ServiceRepository = require('./../service/serviceRepository');

// AppointmentServiceRepository
class ASRepository extends Repository {
  relationMappings = {
    service: {
      relation: 'hasOne',
      repositoryClass: ServiceRepository,
      join: {
        from: 'appointment_services.service_id',
        to: 'services.id',
      },
    },
  };

  constructor() {
    super();
    this.model = AS;
    this.properties = ['services.name', 'services.cost'];
  }
}

module.exports = new ASRepository();
