const Repository = require('./../models/Repository');
const Service = require('./../models/services');

class ServiceRepository extends Repository {
  constructor() {
    super();
    this.model = Service;
  }

    async beforeCreate(payload, param) {
    //   console.log(param.context);
      return {}
    }
}

module.exports = new ServiceRepository();
