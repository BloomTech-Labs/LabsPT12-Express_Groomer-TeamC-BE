const createHttpError = require('http-errors');
const GroomerRepository = require('./../groomer/groomerRepository');
const stateAbbr = require('./../utils/stateAbbr');
const turf = require('@turf/turf');

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
    const stateQuery = q.length > 2 ? stateAbbr(q, 'abbr') : q;

    const result = (await this.repository.get()).filter(
      (groomer) =>
        groomer.name.includes(q) ||
        (groomer.city &&
          (groomer.city.includes(q) || q.includes(groomer.city))) ||
        (groomer.state && groomer.state === stateQuery)
    );
    // if result is empty return an empty array
    if (!result) return res.status(200).json([result]);

    /**  if result, calculate distance between authenticate client and groomers, then sort by distance */
    const authClientGeo = {
      type: 'point',
      coordinates: [req.profile.longitude, req.profile.latitude],
    };
    // map the result, compute distance and add distance property to the result
    const finalResult = result.map((row) =>
      this.setDistanceCallback(row, authClientGeo)
    );

    return res.status(200).json(finalResult);
  }

  setDistanceCallback(resultRow, authClientGeo) {
    // Get groomer geocode data
    const groomerGeo = {
      type: 'point',
      coordinates: [resultRow.longitude, resultRow.latitude],
    };
    // compute distance
    const distance = turf.distance(authClientGeo, groomerGeo, {
      units: 'miles',
    });
    // return existing plus distance
    return {
      ...resultRow,
      distance: distance.toFixed(2) + 'miles',
    };
  }
}

module.exports = new SearchController(GroomerRepository);
