const createHttpError = require("http-errors");
const ProfileRepository = require("./../profile/profileRepository");


const isGroomer = async (req, res, next) => {
    /**
     * This middleware is used protect the endpoint that should be only accessible by the groomer user
     * The middleware check if the authenticated user is groomer, 
     * if yes call the next middleware otherwise throw the 403 error
     */
    try {
        // the user profile information corresponding to the profile id in the request
        const profile = await ProfileRepository.getOne(req.profile.id)
        // check the user type, if not groomer throw error
        if (profile.userType !== "groomer") throw createHttpError(403, "Access denied. Groomer permissions are required.")
        // call next middleware
        return next()
        
    } catch (error) {
        // get the correct response status code
        const statusCode = !(error.statusCode) ? 500 : 403;
        // set the message
        const message = error.message || 'An unknown error occurred while trying to check permissions.';
        // send the error to the error handler middleware
        next(createHttpError(statusCode, message))
    }
}

module.exports = {
    isGroomer
}