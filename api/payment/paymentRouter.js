const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const PaymentController = require('./paymentController');

/**
 * @swagger
 * components:
 *  schemas:
 *    Payment:
 *      type: object
 *      required:
 *        - appointmentId
 *        - stripeToken
 *        - totalPrice
 *      properties:
 *        appointmentId:
 *          type: string
 *        stripeToken:
 *          type: string
 *          description: stripe token id from stripe stripeCreateToken
 *        totalPrice:
 *          type: number
 *        example:
 *          appointmentId: '26aff196-b982-4307-b8d2-d8f51b33931e'
 *          stripeToken: 'tok_1HmMVxAVYwEBFOXj8fpgMDji'
 *          totalPrice: 154.49
 *
 *
 * /payments/charge:
 *  post:
 *    summary: Charge client
 *    security:
 *      - okta: []
 *    tags:
 *      - payment
 *    requestBody:
 *      description: Payment info to be charged
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Payment'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Payment not found'
 *      200:
 *        description: A payment history object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: payment created
 *                result:
 *                  $ref: '#/components/schemas/Payment'
 */
router.post(
  '/charge',
  authRequired,
  PaymentController.post.bind(PaymentController)
);

/**
 * @swagger
 *  components:
 *    parameters:
 *      appointmentId:
 *        name: appointmentId
 *        in: path
 *        description: the appointment id to retrieve services cost
 *        required: true
 *        schema:
 *          type: string
 *
 *
 * /payments/{appointmentId}/total-price:
 *  get:
 *    description: get services costs sum
 *    summary: Returns a sum of services
 *    security:
 *      - okta: []
 *    tags:
 *      - payment
 *    parameters:
 *      - $ref: '#/components/parameters/appointmentId'
 *    response:
 *          200:
 *              description: A comment object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Payment'
 *                      example:
 *                          - id: '26aff196-b982-4307-b8d2-d8f51b33931e'
 *                            appointmentId: '76gff559-b879-5045-b8d2-d8f51b33931e'
 *                            sum: 154.44
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
  '/:appointmentId/total-price',
  authRequired,
  PaymentController.getTotalPrice.bind(PaymentController)
);

module.exports = router;
