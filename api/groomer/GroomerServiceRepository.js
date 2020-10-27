const Repository = require("../models/Repository");
const GroomerService = require("../models/groomer_service");
const createHttpError = require("http-errors");

class GSRepository extends Repository {
    constructor() {
        super()
        this.model = GroomerService 
    }

    async get(args) {
        try {
            const baseUrlArr = args.context.baseUrl.split('/');
            const groomer_id = baseUrlArr[2];
            
            return (await this.model.query().select("*").where({ groomer_id }));
        } catch (error) {
            console.log(error)
            throw createHttpError(500, 'An unknown error occurred while trying to retrieve groomers.')
        }
    }

    async afterCreate(result) {
        return result[0]
    }

    async afterUpdate(result) {
        return result[0]
    }
}

module.exports = new GSRepository()