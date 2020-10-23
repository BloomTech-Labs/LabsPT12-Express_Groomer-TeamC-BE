const express = require("express");
const authRequired = require("./../middleware/authRequired");
const UserTypeController = require("./userTypeController");

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      UserType:
 *          type: object
 *          required: 
 *              - name
 *          properties:
 *              id:
 *                  type: string
 *              name:
 *                  type: string
 *              created_at:
 *                  type: date-time
 *              updated_at:
 *                  type: date-time
 * 
 *
 * /user-types:
 *  get:
 *      description: return a list of user types
 *      summary: Get a list of user types
 *      security:
 *          - okta: []
 *      tags:
 *          - userType
 *      responses:
 *          200:
 *              description: array of user types
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/UserType'
 *                          example:
 *                              - id: '035f3a60-0de0-11eb-93e6-ddb47fc994e4'
 *                                name: 'client'
 *                                created_at: '2020-10-22T02:41:53.648Z'
 *                                updated_at: '2020-10-22T02:41:53.648Z'
 *                              - id: 'dc885650-0de0-11eb-8250-a5697c93ae91'
 *                                name: 'groomer'
 *                                created_at: '2020-10-22T02:41:53.648Z'
 *                                updated_at: '2020-10-22T02:41:53.648Z'
 * 
*              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", authRequired, UserTypeController.index.bind(UserTypeController));
/**
 * @swagger
 * components:
 *  parameters:
 *      userTypeId:
 *          name: id
 *          in: path
 *          required: true
 *          description: ID of user type to return
 *          example: /user-types/035f3a60-0de0-11eb-93e6-ddb47fc994e4
 *          schema:
 *              type: string
 * 
 * 
 * /user-types/{id}:
 *  get:
*      description: Find userType by ID
 *      summary: Returns a single userType
 *      security:
 *          - okta: []
 *      tags:
 *          - userType
 *      parameters:
 *          - $ref: '#/components/parameters/userTypeId'
 *      response:
 *          200:
 *              description: A userType object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/UserType'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/:id", authRequired, UserTypeController.get.bind(UserTypeController));

module.exports = router