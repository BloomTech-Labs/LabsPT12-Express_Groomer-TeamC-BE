const Controller = require('./../controllers');
const RatingRepository = require('./ratingRepository');

class RatingController extends Controller {}

module.exports = new RatingController(RatingRepository);
