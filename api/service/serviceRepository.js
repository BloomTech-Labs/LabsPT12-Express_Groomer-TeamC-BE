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
            const userType  = (await UserType.findById(param.context.profile.user_type))
            console.log(userType);
            
        } catch (error) {
            throw createHttpError(500, "An error occurred while trying to create a service")
        }
      return {}
    }
}

module.exports = new ServiceRepository();
