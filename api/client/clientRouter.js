const router = require('express').Router();
const ClientController = require('./clientController');
const authRequired = require('./../middleware/authRequired');

/**
 * @swagger
 * components:
 *  schemas:
 *      ClientProfile:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        user_type:
 *          type: string
 *          description: id ref user type. GroomerTypeID 'dc885650-0de0-11eb-8250-a5697c93ae91' ClientTypeID '035f3a60-0de0-11eb-93e6-ddb47fc994e4'
 *        avatar:
 *          type: object
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
 *        avatar: {file: []}
 *        phone: '336-615-0548'
 *        address: '365 Melbourne St'
 *        city: 'Burlington'
 *        state: 'NC'
 *        zip_code: 23568
 *        country: 'US'
 *  parameters:
 *      clientId:
 *          name: id
 *          in: path
 *          description: ID of client to return
 *          required: true
 *          example: 750dd31c-9d2f-48c0-b5ca-a8d487863456
 *          schema:
 *              type: string
 *
 *
 * /clients/{id}:
 *  get:
 *      description: Find client by profile ID
 *      summary: Returns a single client
 *      security:
 *          - okta: []
 *      tags:
 *          - client
 *      parameters:
 *          - $ref: '#/components/parameters/clientId'
 *      response:
 *          200:
 *              description: A client object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/GroomerProfile'
 *                          example:
 *                              email: 'frank@example.com'
 *                              name: 'Frank Martinez'
 *                              avatar: {file: []}
 *                              phone: '336-615-0548'
 *                              address: '365 Melbourne St'
 *                              city: 'Burlington'
 *                              state: 'NC'
 *                              zip_code: 23568
 *                              country: 'US'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', authRequired, ClientController.get.bind(ClientController));

module.exports = router;
