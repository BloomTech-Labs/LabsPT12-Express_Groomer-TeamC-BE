const Controller = require("./../controllers");
const UserTypeRepository = require("./userTypeRepository");

class UserTypeController extends Controller {}

module.exports = new UserTypeController(UserTypeRepository)