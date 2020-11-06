const express = require('express');
const GroomerController = require('./groomerController');
const authRequired = require('./../middleware/authRequired');
const gsRouter = require('./GroomerServiceRouter'); // Groomer service router

const router = express.Router();
router.use('/:id/services', gsRouter);

/**
 * @swagger
 * components:
 *  schemas:
 *      Groomer:
 *          type: object
 *          required:
 *              - profile_id
 *              - travel
 *              - travel_distance
 *          properties:
 *              profile_id:
 *                  type: string
 *              travel:
 *                  type: boolean
 *              travel_distance:
 *                  type: integer
 *                  description: distance in miles
 *              bio:
 *                  type: string
 *          example:
 *              profile_id: '4a0dd31d-9d2f-48c0-b5ca-a8d307863404'
 *              travel: true
 *              travel_distance: 100
 *              bio: "pet lover"
 *      GroomerProfile:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              avatarUrl:
 *                  type: object
 *              phone:
 *                  type: string
 *              address:
 *                  type: string
 *              city:
 *                  type: string
 *              state:
 *                  type: string
 *              zip_code:
 *                  type: integer
 *              country:
 *                  type: string
 *              travel:
 *                  type: boolean
 *              travel_distance:
 *                  type: integer
 *                  description: distance in miles
 *              bio:
 *                  type: string
 * /groomers:
 *  get:
 *      description: return list of groomers
 *      summary: Get a list of groomers
 *      security:
 *      tags:
 *          - groomer
 *      responses:
 *          200:
 *              description: array of groomers
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/GroomerProfile'
 *                          example:
 *                              - id: '4a0dd31d-9d2f-48c0-b5ca-a8d307863404'
 *                                profile_id": 'd7yl1rzs0w0rhavhvyec'
 *                                name: 'Jeromy Schiller'
 *                                email: 'Jasper30@yahoo.com'
 *                                phone: null
 *                                avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/xilantra/128.jpg'
 *                                address: null
 *                                city: null
 *                                state: null
 *                                zip_code: null
 *                                country: 'United States'
 *                                travel: true
 *                                travel_distance: 100
 *                                bio: 'Pet lovers'
 *                              - id: '750dd31c-9d2f-48c0-b5ca-a8d487863456'
 *                                profile_id": 'd7yl1rzs0w0rhavhvyec'
 *                                name: 'Matt Jason'
 *                                email: 'matt.json@yahoo.com'
 *                                phone: null
 *                                avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/xilantra/128.jpg'
 *                                address: null
 *                                city: null
 *                                state: null
 *                                zip_code: null
 *                                country: 'United States'
 *                                travel: true
 *                                travel_distance: 100
 *                                bio: 'Pet lovers'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', GroomerController.index.bind(GroomerController));

/**
 * @swagger
 * components:
 *  parameters:
 *      groomerId:
 *          name: id
 *          in: path
 *          description: ID of groomer to return
 *          required: true
 *          example: 750dd31c-9d2f-48c0-b5ca-a8d487863456
 *          schema:
 *              type: string
 *
 *
 * /groomers/{id}:
 *  get:
 *      description: Find groomer by profile ID
 *      summary: Returns a single groomer
 *      security:
 *          - okta: []
 *      tags:
 *          - groomer
 *      parameters:
 *          - $ref: '#/components/parameters/groomerId'
 *      response:
 *          200:
 *              description: A groomer object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/GroomerProfile'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', authRequired, GroomerController.get.bind(GroomerController));

/**
 * @swagger
 * /groomers:
 *  post:
 *    summary: Add a groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer
 *    requestBody:
 *      description: Groomer object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Groomer'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Groomer not found'
 *      200:
 *        description: A groomer object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer created
 *                profile:
 *                  $ref: '#/components/schemas/Groomer'
 */
router.post('/', authRequired, GroomerController.post.bind(GroomerController));

/**
 * @swagger
 * /groomers:
 *  put:
 *    summary: Update a groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer
 *    requestBody:
 *      description: Groomer object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Groomer'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer updated
 *                profile:
 *                  $ref: '#/components/schemas/Groomer'
 */
router.put('/', authRequired, GroomerController.put.bind(GroomerController));

/**
 * @swagger
 * /groomers/{id}:
 *  delete:
 *    summary: Remove a groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer
 *    parameters:
 *      - $ref: '#/components/parameters/groomerId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Groomer '750dd31c-9d2f-48c0-b5ca-a8d487863456' was deleted.
 *                groomer:
 *                  $ref: '#/components/schemas/Groomer'
 */
router.delete(
  '/:id',
  authRequired,
  GroomerController.del.bind(GroomerController)
);

router.get(
  '/:groomerProfileId/appointments',
  GroomerController.getGroomerAppointments.bind(GroomerController)
);

module.exports = router;
