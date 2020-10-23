const createHttpError = require('http-errors');
const GroomerRepository = require('./../groomer/groomerRepository');

class SearchController {
  constructor(GroomerRepository) {
    this.repository = GroomerRepository;
  }

  /**
   * Search for entries corresponding to the queries in the groomers table
   * @param {object} req express request object
   * @param {object} res express response object
   */
  async searchGroomers(req, res, next) {
    const query = req.query || undefined;

    if (!query || (query && !('q' in query)))
      return next(createHttpError.NotFound());
    const { q } = query;
    const result = (await this.repository.get()).filter(
      (groomer) =>
        groomer.name.includes(q) ||
        (groomer.city && groomer.city.includes(q)) ||
        (groomer.state && groomer.state.includes(q))
    );

    return res.status(200).json(result);
  }
}

module.exports = new SearchController(GroomerRepository);
