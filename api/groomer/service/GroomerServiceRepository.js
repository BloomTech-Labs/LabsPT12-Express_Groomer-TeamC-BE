const Repository = require("./../../models/Repository");
const GroomerService = require("./../../models/groomer_service");

class GroomerRepository extends Repository {
    constructor() {
        super()
        this.model = GroomerService 
    }
}

module.exports = new GroomerRepository()