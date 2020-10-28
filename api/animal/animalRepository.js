const Repository = require('./../models/Repository');
const Animal = require('./../models/animal');
const createHttpError = require('http-errors');

class AnimalRepository extends Repository {
    constructor() {
        super();
        this.model = Animal
    }

    async beforeCreate(payload, param) {
        /**
         * 'owner_id' must the authenticated user
         */
        payload.owner_id = param.context.profile.id
        
        /**
         * Check if file exists in the request object
         * if yes replace picture value by the file link in context file storage
         */
        if (param.context.file.Location) payload.picture = param.context.file.Location
        
        return payload
    }

    async beforeUpdate(id, payload, param) {
        /**
         * Only animal owner can update animal
         */
        const authProfileId = param.context.profile.id;
        if (payload.owner_id !== authProfileId) throw createHttpError(403, 'Operation not allowed. You can update this animal.')

        return payload
    }

    async beforeRemove(id, param) {
        /**
         * Only animal owner can delete animal
         */
        const animal = await this.getOne(id);
        const authProfileId = param.context.profile.id;
        
        if (authProfileId !== animal.owner_id) throw createHttpError(403, 'Operation not allowed. You can not delete this animal.')

        return animal.id
    }
}

module.exports = new AnimalRepository()