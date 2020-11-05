const Controller = require('./../controllers');
const ClientRepository = require('./clientRepository');

class ClientController extends Controller {}

module.exports = new ClientController(ClientRepository);
