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
 *        - id
 *        - email
 *        - name
 *        - avatarUrl
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        avatarUrl:
 *          type: string
 *          description: public url of profile avatar
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
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
 *                - id: '00uhjfrwdWAQvD8JV4x6'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                - id: '013e4ab94d96542e791f'
 *                  email: 'cathy@example.com'
 *                  name: 'Cathy Warmund'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg'
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

// temp endpoint for testing while we get login to work
router.get('/temp', function (req, res) {
  Profiles.findAll()
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
 *      example: 00uhjfrwdWAQvD8JV4x6
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
