const createHttpError = require('http-errors');
const GroomerRepository = require('./../groomer/groomerRepository');
const ProfileRepository = require('./../profile/profileRepository');

const isGroomer = async (req, res, next) => {
  /**
   * This middleware is used protect the endpoint that should be only accessible by the groomer user
   * The middleware check if the authenticated user is groomer,
   * if yes call the next middleware otherwise throw the 403 error
   */
  try {
    // the user profile information corresponding to the profile id in the request
    const profile = await ProfileRepository.getOne(req.profile.id);
    // check the user type, if not groomer throw error
    if (profile.userType !== 'groomer')
      throw createHttpError(
        403,
        'Access denied. Groomer permissions are required.'
      );
    // call next middleware
    return next();
  } catch (error) {
    // get the correct response status code
    const statusCode = !error.statusCode ? 500 : 403;
    // set the message
    const message =
      error.message ||
      'An unknown error occurred while trying to check permissions.';
    // send the error to the error handler middleware
    next(createHttpError(statusCode, message));
  }
};

const canPerform = async (req, res, next) => {
  /**
   * This middleware protect stored data by restricted some
   * operations on the table to the no owner's data.
   *
   */
  try {
    const baseUrlArr = req.baseUrl.split('/');
    const groomer_id = baseUrlArr[2];
    const authGroomer = await GroomerRepository.getOne(req.profile.id);
    // if is POST request, set groomer_id in the body to the authenticated user
    if (req.method === 'POST') req.body.groomer_id = authGroomer.id;
    // if is is PUT or DELETE request, verify that id in the params is equal to the authenticated user;
    // verify the owner of the data by verifying the ID to be updated to be deleted is the same with the
    // authenticated user
    if ((req.method === 'PUT') &&
      (groomer_id !== authGroomer.id ||
        authGroomer.id !== req.body.groomer_id ||
        groomer_id !== req.body.groomer_id)
    )
      throw createHttpError(
        403,
        'Access denied. You cannot perform the update operation on this row.'
      );
    
    if ((req.method === 'DELETE') && (groomer_id !== authGroomer.id))
      throw createHttpError(
        403,
        'Access denied. You cannot perform the delete operation on this row.'
      );

    return next();
  } catch (error) {
    // get the correct response status code
    const statusCode = !error.statusCode ? 500 : 403;
    // set the message
    const message =
      error.message ||
      'An unknown error occurred while trying to check permissions.';
    // send the error to the error handler middleware
    next(createHttpError(statusCode, message));
  }
};

module.exports = {
  isGroomer,
  canPerform,
};
