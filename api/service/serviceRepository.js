const createHttpError = require('http-errors');
const Repository = require('./../models/Repository');
const Service = require('./../models/services');
const UserType = require('./../models/userType');

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

  async afterCreate(result) {
    return result[0];
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
