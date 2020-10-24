const Controller = require("./../controllers");
const ServiceRepository = require("./serviceRepository");

class ServiceController extends Controller {}

module.exports = new ServiceController(ServiceRepository)