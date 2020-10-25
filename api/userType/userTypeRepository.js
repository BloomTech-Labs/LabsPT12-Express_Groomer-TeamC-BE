const Repository = require('./../models/Repository');
const UserType = require('../models/userType');

class UserTypeRepository extends Repository {
  constructor() {
    super();
    this.model = UserType;
  }

  async afterCreate(result) {
    return result[0];
  }

  async afterUpdate(result) {
    return result[0];
  }
}

module.exports = new UserTypeRepository();
