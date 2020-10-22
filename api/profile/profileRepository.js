const Repository = require('../models/Repository');
const Profile = require('../models/profile');

class ProfileRepository extends Repository {
  constructor() {
    super();
    this.model = Profile;
  }

  async beforeCreate(payload, param) {
    const { context } = param;
    payload.avatarUrl = context.file.Location;

    return payload;
  }

  async afterCreate(result) {
    return result[0];
  }

  async afterUpdate(result) {
    return result[0];
  }
}

module.exports = new ProfileRepository();
