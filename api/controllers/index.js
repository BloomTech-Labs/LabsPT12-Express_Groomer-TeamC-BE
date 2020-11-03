/**
 * This is the base controller class to handle requests
 */
class Controller {
  /**
   *
   * @param {object} repository model repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Get all data from a given table
   * @returns an array of all table entries
   * @param {object} req express request object
   * @param {object} res express response object
   */
  async index(req, res) {
    try {
      // call get method from repository to get all rows
      const result = await this.repository.get({ context: req });
      // return the result if success with the status code 200
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      // get the correct error status code
      // by checking the instance of the error
      const statusCode = error.errorCode || 500;
      // return error if error with status 404 or 500
      return res.status(statusCode).json({ message: error.message });
    }
  }

  /**
   * Get one specified row from table
   * @returns an object corresponding to the specified ID from request params
   * @param {object} req express request object
   * @param {object} res express response object
   */
  async get(req, res) {
    try {
      // get the ID to be retrieve from the request params
      const id = String(req.params.id);
      // call getOne method from repository to retrieve the corresponding row
      const result = await this.repository.getOne(id, { context: req });
      // return the result if success with the status code 200
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      // get the correct error status code
      // by checking the instance of the error
      const statusCode = error.errorCode || 500;
      // return error if error with status 404 or 500
      return res.status(statusCode).json({ message: error.message });
    }
  }

  /**
   * Insert to a given table. Require body in the request object
   * @returns the created object
   * @param {object} req express request object
   * @param {object} res express response object
   */
  async post(req, res) {
    try {
      // retrieve request body or set it to undefined
      const { body } = req || undefined;
      // if body is set, perform to insert operation
      if (body) {
        // call the create method from the repository to insert the data
        const result = await this.repository.create(body, { context: req });
        // check if the insert operation are success,
        // if not return the error with the status code 400
        if (!result || (result && !('id' in result)))
          return res.status(400).json(result);
        // return the result if success with the status code 200
        return res.status(201).json({
          message: `${this.repository.model.constructor.name.toLowerCase()} has been created.`,
          result,
        });
      }
      return res.status(400).json({ message: 'Request does not contain body' });
    } catch (error) {
      console.log(error);
      // get the correct error status code
      // by checking the instance of the error
      const statusCode = error.statusCode || 500;
      // return error if error with status 404 or 500
      return res.status(statusCode).json({ message: error.message });
    }
  }

  /**
   * Update a specified row in a given table. Require ID referenced row to be updated and body
   * @returns object corresponding to the updated row
   * @param {object} req express request object
   * @param {object} res express response object
   */
  async put(req, res) {
    try {
      // retrieve request body or set it to undefined
      const { body } = req || undefined;

      // check if the body is set, and the ID to be updated exists is the body
      // if not, return the error with the status code 400
      if (!body || (body && !('id' in body)))
        return res.status(400).json({
          message: 'Request does not contain body or "id" is undefined',
        });

      // check if the id exists
      await this.repository.getOne(req.body.id, { context: req });

      // call the update method from the repository
      const result = await this.repository.update(body.id, body, {
        context: req,
      });
      // if data validation failed, return the error if the status code 400
      if (!result || (result && !('id' in result)))
        return res.status(400).json(result);
      // return the result if success with the status code 200
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      // get the correct error status code
      // by checking the instance of the error
      const statusCode = error.errorCode || error.statusCode || 500;
      // return error if error with status 404 or 500
      return res.status(statusCode).json({ message: error.message });
    }
  }

  /**
   * Deleted one row in a given table. Require ID referencing row to be deleted
   * @returns ID of delete row
   * @param {object} req express request object
   * @param {object} res express response object
   */
  async del(req, res) {
    try {
      // Get id to be deleted from params
      const id = req.params.id;
      // call the remove function from the repository
      const result = await this.repository.remove(id, { context: req });
      // return result if success
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      // get the correct error status code
      // by checking the instance of the error
      const statusCode = error.errorCode || error.statusCode || 500;
      // return error if error with status 404 or 500
      return res.status(statusCode).json({ message: error.message });
    }
  }
}

module.exports = Controller;
