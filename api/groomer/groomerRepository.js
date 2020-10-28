const Repository = require('../models/Repository');
const Groomer = require('../models/groomer');
const NotFound = require('../errors/NotFound');
const UnauthorizedUser = require('../errors/UnauthorizedUser');
const Profile = require('../models/profile');
const GSRepository = require('./GroomerServiceRepository');
const ProfileRepository = require('./../profile/profileRepository');

class GroomerRepository extends Repository {

  relationMappings = {
    profile: {
      relation: 'hasOne',
      repositoryClass: ProfileRepository,
      join: {
        from: 'groomers.profile_id',
        to: 'profiles.id'
      }
    },
    services: {
      relation: 'hasMany',
      repositoryClass: GSRepository,
      join: {
        from: 'groomers.id',
        to: 'groomer_services.groomer_id'
      }
    }
  }

  constructor() {
    super();
    this.model = Groomer;
    this.properties = [
      'groomers.id',
      'groomers.profile_id',
      'profiles.name',
      'profiles.email',
      'profiles.phone',
      'profiles.avatarUrl',
      'profiles.address',
      'profiles.city',
      'profiles.state',
      'profiles.zip_code',
      'profiles.country',
      'groomers.travel',
      'groomers.travel_distance',
      'groomers.bio',
      'groomers.created_at',
    ];
  }

  async get() {
    return await this.relatedAll();
  }

  async getOne(id) {
    const result = await this.relatedOne({profile_id: id});
    if (!result) throw new NotFound('Could find groomer with the specified id');
    return result;
  }

  async beforeCreate(payload) {
    // get profile ID from the request params
    const profile_id = payload.profile_id || undefined;
    // if profile ID sis not defined return the error
    if (!profile_id) throw new NotFound('"profile_id" is required. ');

    // check if the profile is Groomer
    const groomer = await Profile.query()
      .join('user_types', 'user_types.id', 'profiles.user_type')
      .where({ 'profiles.id': profile_id })
      .select('user_types.name as userType')
      .first();
    // is not groomer throw an error
    if (!groomer || (groomer && groomer.userType !== 'groomer'))
      throw new UnauthorizedUser(
        'Access denied. Only groomer are allowed to perform this operation.'
      );

    return payload;
  }

  async afterCreate(result) {
    return result[0];
  }

  async afterUpdate(result) {
    return result[0];
  }
}

module.exports = new GroomerRepository();
