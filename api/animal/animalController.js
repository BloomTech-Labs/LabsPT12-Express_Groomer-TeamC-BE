const Controller = require('./../controllers');
const AnimalRepository = require('./animalRepository');

class AnimalController extends Controller {}

module.exports = new AnimalController(AnimalRepository)