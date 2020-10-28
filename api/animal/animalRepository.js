const Repository = require('./../models/Repository');
const Animal = require('./../models/animal')

class AnimalRepository extends Repository {
    constructor() {
        super();
        this.model = Animal
    }
}

module.exports = new AnimalRepository()