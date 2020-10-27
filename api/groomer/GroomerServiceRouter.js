const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const permissions = require('../middleware/permissions');
const GSController = require('./GroomerServiceController');

/**
 * @swagger
 * components:
 *  schemas:
 *      GroomerService:
 *          type: object
 *          required:
 *              - groomer_id
 *              - service_id
 *              - service_hours
 *          properties:
 *              groomer_id:
 *                  type: string
 *              service_id:
 *                  type: boolean
 *              service_hours:
 *                  type: integer
 *          example:
 *              groomer_id: '4a0dd31d-9d2f-48c0-b5ca-a8d307863404'
 *              service_id: '231863f2-fcac-4ab3-92fe-c1c1e322ca19'
 *              service_hours: 'Mon-Fri 10am-8pm'
 * 
 * 
 * /groomers/{id}/services:
 *  get:
 *      description: return list of groomer services
 *      summary: Get a list of services of the specified groomer id
 *      security:
 *          - okta: []
 *      tags:
 *          - groomerService
 *      responses:
 *          200:
 *              description: array of groomer services
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/GroomerService'
 *                          example:
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, GSController.index.bind(GSController));

/**
 * @swagger
 * /groomers/{id}/services:
 *  post:
 *    summary: Add a groomer service
 *    security:
 *      - okta: []
 *      - isGroomer: {}
 *    tags:
 *      - groomerService
 *    requestBody:
 *      description: Groomer service object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/GroomerService'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Groomer service not found'
 *      200:
 *        description: A groomer service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer service created
 *                profile:
 *                  $ref: '#/components/schemas/GroomerService'
 */
router.post(
  '/',
  authRequired,
  permissions.isGroomer,
  permissions.canPerform,
  GSController.post.bind(GSController)
);

/**
 * @swagger
 * /groomers/{id}/services:
 *  put:
 *    summary: Update a groomer service
 *    security:
 *      - okta: []
 *      - isGroomer: {}
 *    tags:
 *      - groomerService
 *    requestBody:
 *      description: Groomer service object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/GroomerService'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer service updated
 *                profile:
 *                  $ref: '#/components/schemas/GroomerService'
 */
router.put(
  '/',
  authRequired,
  permissions.isGroomer,
  permissions.canPerform,
  GSController.put.bind(GSController)
);

/**
 * @swagger
*  parameters:
 *      groomerServiceId:
 *          name: groomerServiceId
 *          in: path
 *          description: ID of groomer service to delete
 *          required: true
 *          example: 750dd31c-9d2f-48c0-b5ca-a8d487863456
 *          schema:
 *              type: string
 * 
 * 
 * /groomers/{id}/services/{groomerServiceId}:
 *  delete:
 *    summary: Remove a groomer service
 *    security:
 *      - okta: []
 *      - isGroomer
 *    tags:
 *      - groomerService
 *    parameters:
 *      - $ref: '#/components/parameters/groomerServiceId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Groomer service '750dd31c-9d2f-48c0-b5ca-a8d487863456' was deleted.
 *                groomer:
 *                  $ref: '#/components/schemas/GroomerService'
 */
router.delete(
  '/',
  authRequired,
  permissions.isGroomer,
  permissions.canPerform,
  GSController.del.bind(GSController)
);

module.exports = router;
