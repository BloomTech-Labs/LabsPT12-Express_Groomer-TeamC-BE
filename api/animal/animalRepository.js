const Repository = require('./../models/Repository');
const Animal = require('./../models/animal');
const createHttpError = require('http-errors');

class AnimalRepository extends Repository {
  constructor() {
    super();
    this.model = Animal;
  }

  async beforeCreate(payload, param) {
    /**
     * 'owner_id' must the authenticated user
     */
    payload.owner_id = param.context.profile.id;

    /**
     * Check if file exists in the request object
     * if yes replace picture value by the file link in context file storage
     */
    if (param.context.file && param.context.file.Location)
      payload.picture = param.context.file.Location;

    delete payload.animal_picture;

    return payload;
  }

  afterCreate(result) {
    return result[0];
  }

  async beforeUpdate(id, payload, param) {
    /**
     * Only animal owner can update animal
     */
    const authProfileId = param.context.profile.id;
    if (payload.owner_id !== authProfileId)
      throw createHttpError(
        403,
        'Operation not allowed. You can update this animal.'
      );
    console.log(payload.owner_id);
    /**
     * Check if file exists in the request object
     * if yes replace picture value by the file link in context file storage
     */
    if (param.context.file && param.context.file.Location)
      payload.picture = param.context.file.Location;

    delete payload.animal_picture;

    return payload;
  }

  async afterUpdate(result) {
    console.log(result);
    return result[0];
  }

  async beforeRemove(id, param) {
    /**
     * Only animal owner can delete animal
     */
    const animal = await this.getOne(id);
    const authProfileId = param.context.profile.id;

    if (authProfileId !== animal.owner_id)
      throw createHttpError(
        403,
        'Operation not allowed. You can not delete this animal.'
      );

    return animal.id;
  }
}

module.exports = new AnimalRepository();
