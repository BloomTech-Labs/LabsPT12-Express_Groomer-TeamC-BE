const Controller = require('../controllers');
const GroomerRepository = require('./groomerRepository');

class GroomerController extends Controller {}

module.exports = new GroomerController(GroomerRepository);
