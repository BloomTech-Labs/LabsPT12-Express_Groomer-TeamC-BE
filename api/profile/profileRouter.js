const express = require('express');
const authRequired = require('../middleware/authRequired');
const ProfileRepository = require('./profileRepository');
const router = express.Router();
const NotFound = require('./../errors/NotFound');

/**
 * @swagger
 * components:
 *  schemas:
 *    Profile:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - user_type
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        user_type:
 *          type: string
 *          description: id ref user type. GroomerTypeID 'dc885650-0de0-11eb-8250-a5697c93ae91' ClientTypeID '035f3a60-0de0-11eb-93e6-ddb47fc994e4'
 *        avatarUrl:
 *          type: string
 *          description: public url of profile avatar
 *        phone:
 *          type: string
 *        address:
 *          type: string
 *        city:
 *          type: string
 *        state:
 *          type: string
 *        zip_code:
 *          type: integer
 *        country:
 *          type: string       
 *          description: by default US 
 *      example:
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *        phone: '336-615-0548'
 *        address: '365 Melbourne St'
 *        city: 'Burlington'
 *        state: 'NC'
 *        zip_code: 23568
 *        country: 'US'
 *        
 *
 * /profiles:
 *  get:
 *    description: Returns a list of profiles
 *    summary: Get a list of all profiles
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    responses:
 *      200:
 *        description: array of profiles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Profile'
 *              example:
 *                - id: '035f3a60-056e0-11eb-93e6-ddb47fc994e4'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  phone: 336-615-0548
 *                  address: '365 Melbourne St'
 *                  city: 'Burlington'
 *                  state: 'NC'
 *                  zip_code: 23568
 *                  country: 'US'
 *                - id: '035f3a60-056e0-11eb-93e6-ddb47fc994e4'
 *                  email: 'frank@example.com'
 *                  name: 'Derek Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  phone: 336-615-0548
 *                  address: '365 Melbourne St'
 *                  city: 'Burlington'
 *                  state: 'NC'
 *                  zip_code: 23568
 *                  country: 'US'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, function (req, res) {
  ProfileRepository.get()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});


/**
 * @swagger
 * components:
 *  parameters:
 *    profileId:
 *      name: id
 *      in: path
 *      description: ID of the profile to return
 *      required: true
 *      example: 035f3a60-0de0-11eb-93e6-ddb47fc994e4
 *      schema:
 *        type: string
 *
 * /profile/{id}:
 *  get:
 *    description: Find profiles by ID
 *    summary: Returns a single profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    parameters:
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 */
router.get('/:id', authRequired, async function (req, res) {
  const id = String(req.params.id);
  try {
    const profile = await ProfileRepository.getOne(id);
    res.status(200).json(profile);
  } catch (error) {
    const statusCode = error instanceof NotFound ? 404 : 500;
    res.status(statusCode).json({ error: error.message });
  }
});

/**
 * @swagger
 * /profile:
 *  post:
 *    summary: Add a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */
router.post('/', authRequired, async (req, res) => {
  const profile = req.body;
  try {
    const result = await ProfileRepository.create(profile);
    res.status(200).json({ message: 'profile created', profile: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /profile:
 *  put:
 *    summary: Update a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */
router.put('/', authRequired, async function (req, res) {
  const profile = req.body;
  try {
    const result = await ProfileRepository.update(profile.id, profile);
    res
      .status(200)
      .json({ message: 'Profile has been updated', profile: result });
  } catch (error) {
    console.log(error);
    const statusCode = error instanceof NotFound ? 404 : 500;
    res.status(statusCode).json(error.message);
  }
});

/**
 * @swagger
 * /profile/{id}:
 *  delete:
 *    summary: Remove a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    parameters:
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Profile '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */
router.delete('/:id', authRequired, async function (req, res) {
  const id = req.params.id;
  try {
    const result = await ProfileRepository.remove(id);
    res
      .status(200)
      .json({ message: 'Profile has been deleted', profile: result });
  } catch (error) {
    console.log(error);
    const statusCode = error instanceof NotFound ? 404 : 500;
    res.status(statusCode).json(error.message);
  }
});

module.exports = router;
