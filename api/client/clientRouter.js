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

/**
 * @swagger
 * components:
 *  schemas:
 *      AppointmentInfo:
 *          type: object
 *          properties:
 *              id:
 *                type: string
 *              clientId:
 *                type: string
 *              clientName:
 *                type: string
 *              groomerId:
 *                type: string
 *              serviceId:
 *                type: string
 *              animalId:
 *                type: string
 *              animalType:
 *                type: string
 *              animalBreed:
 *                type: string
 *              location:
 *                type:string
 *              appointmentDate:
 *                type: date-time
 *              createdAt:
 *                type: date-time
 *              groomerName:
 *                type: string
 *              groomerEmail:
 *                type: string
 *              serviceName:
 *                type: string
 *              serviceCost:
 *                type: string
 *
 *
 * /clients/{clientProfileId}/appointments:
 *  get:
 *    description: return list of client appointments
 *    summary: Get a list of client appointments
 *    security:
 *      - okta: []
 *    tags:
 *      - client
 *    response:
 *      200:
 *        description: array of client appointments
 *        schema:
 *            type: array
 *            items:
 *                $ref: '#/components/schemas/AppointmentInfo'
 *            example:
 *                - id: '60436819-9b64-445b-a8e9-0b39c9e0e40b'
 *                  clientId: 'user7_id'
 *                  clientName: 'Martin Mark'
 *                  groomerId: '00ulthapbErVUwVJy4x6'
 *                  serviceId: '9byr1zbnz3vzuqj5y97h'
 *                  animalId: 'animal6_id'
 *                  animalType: 'rabbit'
 *                  animalBreed: 'lionhead rabbit'
 *                  location: 'my address'
 *                  appointmentDate: '2020-10-30T08:50:00.000Z'
 *                  createdAt: '2020-11-04T21:38:06.765Z'
 *                  groomerName: 'Kole Hane'
 *                  groomerEmail: 'llama001@maildrop.cc'
 *                  serviceName: 'Bath & Full Haircut'
 *                  serviceCost: 19.99
 *                - id: '60436819-9b64-445b-a8e9-0b39c9e0e40b'
 *                  clientId: 'user7_id'
 *                  clientName: 'Martin Mark'
 *                  groomerId: '00ulthapbErVUwVJy4x6'
 *                  serviceId: '9byr1zbnz3vzuqj5y97h'
 *                  animalId: 'animal6_id'
 *                  animalType: 'rabbit'
 *                  animalBreed: 'lionhead rabbit'
 *                  location: 'my address'
 *                  appointmentDate: '2020-10-30T08:50:00.000Z'
 *                  createdAt: '2020-11-04T21:38:06.765Z'
 *                  groomerName: 'Kole Hane'
 *                  groomerEmail: 'llama001@maildrop.cc'
 *                  serviceName: 'Full Haircut'
 *                  serviceCost: 9.99
 *      401:
 *          $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *          $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
  '/:clientProfileId/appointments',
  authRequired,
  ClientController.getClientAppointments.bind(ClientController)
);

/**
 * @swagger
 * components:
 *  parameters:
 *    clientProfileId:
 *      name: clientProfileId
 *      in: path
 *      description: Client profile id associated to the data
 *      required: true
 *      schema:
 *        type: string
 *  schemas:
 *    PaymentHistory:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        appointment_id:
 *          type: string
 *        payment_id:
 *          type: string
 *        amount:
 *          type: number
 *        payment_method:
 *          type: string
 *        last4:
 *          type: string
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 *
 *
 * /clients/{clientProfileId}:
 *  get:
 *    description: returns list of payments
 *    summary: Get a list of payments by client id
 *    parameters:
 *      - $ref: '#/components/parameters/clientProfileId'
 *    security:
 *      - okta: []
 *    tags:
 *      - clientPayment
 *    responses:
 *      200:
 *        description: array of payments
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/PaymentHistory'
 *              example:
 *                - id: '73b44011-0c27-4be4-a16c-fedea74860d8'
 *                  appointment_id: '26aff196-b982-4307-b8d2-d8f51b33931e'
 *                  payment_id: 'ch_1HmMWFAVYwEBFOXjoSG86stW'
 *                  amount: 15499
 *                  payment_method: 'Visa-card'
 *                  last4: '4242'
 *                  created_at: '2020-11-11T16:50:04.208Z'
 *                  updated_at: '2020-11-11T16:50:04.208Z'
 *                - id: '121aecd0-3f4c-4da5-8fb4-f43d56dc5e69'
 *                  appointment_id: '26aff196-b982-4307-b8d2-d8f51b33931e'
 *                  payment_id: 'ch_1HmMTqAVYwEBFOXjDGmXkMkf'
 *                  amount: 17499
 *                  payment_method: 'Visa-card'
 *                  last4: '4242'
 *                  created_at: '2020-11-11T16:47:35.323Z'
 *                  updated_at: '2020-11-11T16:47:35.323Z'
 *      401:
 *          $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *          $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
  '/:clientProfileId/payments',
  authRequired,
  ClientController.getPaymentHistories.bind(ClientController)
);

module.exports = router;
