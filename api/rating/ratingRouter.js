const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const RatingController = require('./ratingController');

/**
 * @swagger
 * components:
 *  schemas:
 *      Rating:
 *          type: object
 *          required:
 *              - user_id
 *              - rating
 *          properties:
 *              user_id:
 *                  type: string
 *                  description: profile ID. Should be different with the authenticate user
 *              rating:
 *                  type: number
 *          example:
 *              user_id: 'user5_id'
 *              rating: 4.5
 *
 * /ratings:
 *  post:
 *      summary: Rating a groomer or client
 *      security:
 *          - okta: []
 *      tags:
 *          - rating
 *      requestBody:
 *          description: Rating object to be added
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Rating'
 *      response:
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          200:
 *              description: A rating object
 *              content:
 *                  application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                      message:
 *                          type: string
 *                          description: A message about the result
 *                          example: rating created
 *                      profile:
 *                          $ref: '#/components/schemas/Rating'
 */
router.post('/', authRequired, RatingController.post.bind(RatingController));

module.exports = router;
