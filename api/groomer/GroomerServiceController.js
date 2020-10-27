const Controller = require('../controllers');
const GSRepository = require('./GroomerServiceRepository');

class GSController extends Controller {}

module.exports = new GSController(GSRepository);
