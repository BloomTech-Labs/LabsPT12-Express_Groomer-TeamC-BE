const express = require('express');
const authRequired = require('./../middleware/authRequired');
const ServiceController = require('./serviceController');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Service:
 *          type: object
 *          required:
 *              - name
 *              - cost
 *          properties:
 *              name:
 *                  type: string
 *              cost:
 *                  type: number
 *              description:
 *                  type: string
 *          example:
 *              name: 'Bath & Full Haircut'
 *              cost: 19.99
 *              description: 'Odit reiciendis necessitatibus delectus nisi incidunt tempora hic.'
 * /services:
 *  get:
 *      description: return list of services
 *      summary: Get a list of services
 *      security:
 *          - okta: []
 *      tags:
 *          - service
 *      responses:
 *          200:
 *              description: array of services
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Service'
 *                          example:
 *                              - id: '4a0dd31d-9d2f-48c0-b5ca-a8d307863404'
 *                                name: 'Bath & Full Haircut'
 *                                description": 'Odit reiciendis necessitatibus delectus nisi incidunt tempora hic.'
 *                                cost: 19.99
 *                              - id: '4a0dd31d-9d2f-48c0-b5ca-a8d307863404'
 *                                name: 'Full Grooming'
 *                                description": 'Odit reiciendis necessitatibus delectus nisi incidunt tempora hic.'
 *                                cost: 39.99
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, ServiceController.index.bind(ServiceController));
/**
 * @swagger
 * components:
 *  parameters:
 *      serviceId:
 *          name: id
 *          in: path
 *          description: ID of service to return
 *          required: true
 *          example: 750dd31c-9d2f-48c0-b5ca-a8d487863456
 *          schema:
 *              type: string
 *
 *
 * /services/{id}:
 *  get:
 *      description: Find service by profile ID
 *      summary: Returns a single service
 *      security:
 *          - okta: []
 *      tags:
 *          - service
 *      parameters:
 *          - $ref: '#/components/parameters/serviceId'
 *      response:
 *          200:
 *              description: A service object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Service'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', authRequired, ServiceController.get.bind(ServiceController));

/**
 * @swagger
 * /services:
 *  post:
 *    summary: Add a service
 *    security:
 *      - okta: []
 *    tags:
 *      - service
 *    requestBody:
 *      description: Service object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Service'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Service not found'
 *      200:
 *        description: A service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: service created
 *                profile:
 *                  $ref: '#/components/schemas/Service'
 */
router.post('/', authRequired, ServiceController.post.bind(ServiceController));
/**
 * @swagger
 * /services:
 *  put:
 *    summary: Update a service
 *    security:
 *      - okta: []
 *    tags:
 *      - services
 *    requestBody:
 *      description: Service object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Service'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: service created
 *                profile:
 *                  $ref: '#/components/schemas/Service'
 */
router.put('/', authRequired, ServiceController.put.bind(ServiceController));

/**
 * @swagger
 * /services/{id}:
 *  delete:
 *    summary: Remove a service
 *    security:
 *      - okta: []
 *    tags:
 *      - service
 *    parameters:
 *      - $ref: '#/components/parameters/serviceId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Groomer '750dd31c-9d2f-48c0-b5ca-a8d487863456' was deleted.
 *                service:
 *                  $ref: '#/components/schemas/Service'
 */
router.delete('/', authRequired, ServiceController.del.bind(ServiceController));

module.exports = router;
