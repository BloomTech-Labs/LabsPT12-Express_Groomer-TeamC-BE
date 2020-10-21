const Repository = require('../models/Repository');
const Profile = require('../models/profile');

class ProfileRepository extends Repository {
  constructor() {
    super();
    this.model = Profile;
  }

  async afterCreate(result) {
    return result[0];
  }

  async afterUpdate(result) {
    return result[0];
  }
}

module.exports = new ProfileRepository();
