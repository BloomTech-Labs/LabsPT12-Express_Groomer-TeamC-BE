const Repository = require('./../models/Repository');
const Profile = require('./../models/profile');
const AnimalRepository = require('./../animal/animalRepository');
const UserTypeRepository = require('./../userType/userTypeRepository');
const createHttpError = require('http-errors');

class ClientRepository extends Repository {
  relationMappings = {
    animals: {
      relation: 'hasMany',
      repositoryClass: AnimalRepository,
      join: {
        from: 'profiles.id',
        to: 'animals.owner_id',
      },
    },
  };

  constructor() {
    super();
    this.model = Profile;
    this.properties = [
      'profiles.id',
      'profiles.name',
      'profiles.email',
      'profiles.phone',
      'profiles.avatarUrl',
      'profiles.address',
      'profiles.city',
      'profiles.state',
      'profiles.zip_code',
      'profiles.latitude',
      'profiles.longitude',
      'profiles.country',
      'profiles.created_at',
      'profiles.updated_at',
    ];
  }

  async getOne(id) {
    const userType = (await UserTypeRepository.getWhere({ name: 'client' }))[0];

    const result = await this.relatedOne({
      'profiles.id': id,
      user_type: userType.id,
    });
    if (!result) throw new createHttpError(404, 'Profile not found.');

    return result;
  }
}

module.exports = new ClientRepository();
