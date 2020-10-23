const Repository = require("./../models/Repository");
const UserType = require("../models/userType");

class UserTypeRepository extends Repository {
    constructor() {
        super()
        this.model = UserType
    }
}

module.exports = new UserTypeRepository()