const createHttpError = require('http-errors');
const Repository = require('./../models/Repository');
const Service = require('./../models/services');
const UserType = require('./../models/userType');
const Groomer = require("./../models/groomer");
const GroomerService = require("./../models/groomer_service");

class ServiceRepository extends Repository {
  constructor() {
    super();
    this.model = Service;
  }

  async beforeCreate(payload, param) {
    /**
     * Only user groomer can create a service
     * the line below check the user type, if the user type
     * is not groomer its throw a 403 error
     */
    try {
      const userType = await UserType.findById(param.context.profile.user_type);

      if (!userType || (userType && userType.name !== 'groomer'))
        throw createHttpError(
          403,
          'Access denied. Only groomer can create services'
        );
    } catch (error) {
      const message =
        error.message || 'An error occurred while trying to create a service';
      const statusCode = error.statusCode || 500;
      throw createHttpError(statusCode, message);
    }
    return payload;
  }

  async afterCreate(service, param) {
    /**
     * After groomer added service, we are going to link this service to groomer 
     * by adding the service id and groomer id to the groomerService table.
     * The groomer who create the service own that service.
     */
    try {
      // retrieve groomer information
      const groomer = await Groomer.query().where({ profile_id: param.context.profile.id }).first();
      if (!groomer) throw createHttpError(400, "Can't retrieve groomer information. Operation has been aborted.")

      // create link groomer to service
      // We are giving the a default value to the service hour attribute that can be updated later by the groomer.
      const serviceHours = 'Mon-Fri 8am - 4pm'
      await GroomerService.create({
        service_id: service[0].id,
        groomer_id: groomer.id,
        service_hours: serviceHours
      })
      // return the created service and the linked groomer
      return {...service[0], groomer_id: groomer.id, service_hours: serviceHours};
    } catch (error) {
      const message =
        error.message || `An error occurred while trying to link groomer to the created service. Created service id [${service[0].id}]`;
      const statusCode = error.statusCode || 500;
      throw createHttpError(statusCode, message);
    }
  }

  async beforeUpdate(payload, param) {
    /**
     * Only user groomer can update a service
     * the line below check the user type, if the user type
     * is not groomer its throw a 403 error
     */
    try {
      const userType = await UserType.findById(param.context.profile.user_type);

      if (!userType || (userType && userType.name !== 'groomer'))
        throw createHttpError(
          403,
          'Access denied. Only groomer can update services'
        );
    } catch (error) {
      const message =
        error.message || 'An error occurred while trying to update a service';
      const statusCode = error.statusCode || 500;
      throw createHttpError(statusCode, message);
    }
    return payload;
  }

  async afterUpdate(result) {
    return result[0];
  }
}

module.exports = new ServiceRepository();
