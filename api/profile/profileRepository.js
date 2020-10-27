const Repository = require('../models/Repository');
const Profile = require('../models/profile');
const createHttpError = require('http-errors');

class ProfileRepository extends Repository {
  constructor() {
    super();
    this.model = Profile;
    this.properties = [
      'profiles.id',
      'user_types.id as userTypeId',
      'user_types.name as userType',
      'profiles.name',
      'profiles.email',
      'profiles.phone',
      'profiles.avatarUrl',
      'profiles.address',
      'profiles.city',
      'profiles.state',
      'profiles.zip_code',
      'profiles.country',
      'profiles.created_at',
      'profiles.updated_at',
    ];
  }

  async get() {
    return await this.relatedAll('user_types.id', 'user_type');
  }

  async getOne(id) {
    const result = await this.relatedOne(
      'user_types.id',
      'user_type',
      (obj) => obj.id === id
    );

    if (!result) throw new createHttpError(400, 'Profile not found.');
    return result;
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
