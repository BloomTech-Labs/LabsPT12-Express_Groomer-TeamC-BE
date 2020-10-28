const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const AnimalController = require('./animalController');
const fileUploadHandler = require('./../middleware/multer-s3')

/**
 * @swagger
 * components:
 *  schemas:
 *      Animal:
 *          type: object
 *          required:
 *              - owner_id
 *              - name
 *              - animal_type
 *              - breed
 *          properties:
 *              owner_id:
 *                  type: string
 *              name:
 *                  type: boolean
 *              anima_type:
 *                  type: integer
 *                  description: distance in miles
 *              breed:
 *                  type: string
 *              weight:
 *                  type: string
 *              animal_picture:
 *                  type: object
 *              comment: 
 *                  type: file
 *          example:
 *              owner_id: '4a0dd31d-9d2f-48c0-b5ca-a8d307863404'
 *              name: 'Kelly'
 *              animal_type: 'Cat'
 *              breed: "pet lover"
 *              weight: '15kg'
 *              animal_picture: {file: []}
 *              comment: 'lorem ipsum'
 * 
 *  
 * /animals:
 *  get:
 *      description: return list of animals
 *      summary: Get a list of animals
 *      security:
 *          - okta: []
 *      tags:
 *          - animal
 *      responses:
 *          200:
 *              description: array of animals
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Animal'
 *                          example:
 *                              - id: '0939048a-8cf9-4ee1-875d-9f54adf2e069'
 *                                owner_id: '4a0dd31d-9d2f-48c0-b5ca-a8d307863404'
 *                                name: 'Kelly'
 *                                animal_type: 'Cat'
 *                                breed: "american curl"
 *                                weight: '15kg'
 *                                animal_picture: {file: []}
 *                                comment: 'lorem ipsum'
 *                              - id: '0939048a-8cf9-4ee1-875d-9f54adf2e069'
 *                                owner_id: '4a0dd31d-9d2f-48c0-b5ca-a8d307863404'
 *                                name: 'Dacks'
 *                                animal_type: 'Dog'
 *                                breed: "bulldog"
 *                                weight: '15kg'
 *                                animal_picture: {file: []}
 *                                comment: 'lorem ipsum'
 * 
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              403:
 *                  $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, AnimalController.index.bind(AnimalController));

/**
 * @swagger
 * components:
 *  parameters:
 *      animalId:
 *          name: id
 *          in: path
 *          description: ID of animal to return
 *          required: true
 *          example: 750dd31c-9d2f-48c0-b5ca-a8d487863456
 *          schema:
 *              type: string
 *
 *
 * /animals/{id}:
 *  get:
 *      description: Find animal by profile ID
 *      summary: Returns a single animal
 *      security:
 *          - okta: []
 *      tags:
 *          - animal
 *      parameters:
 *          - $ref: '#/components/parameters/animalId'
 *      response:
 *          200:
 *              description: A animal object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Animal'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', authRequired, AnimalController.get.bind(AnimalController));

/**
 * @swagger
 * /animals:
 *  post:
 *    summary: Add a animal
 *    security:
 *      - okta: []
 *    tags:
 *      - animal
 *    requestBody:
 *      description: Animal object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Animal'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Animal not found'
 *      200:
 *        description: A animal object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: animal created
 *                profile:
 *                  $ref: '#/components/schemas/Animal'
 */
router.post('/', authRequired, fileUploadHandler.single('animal_picture'), AnimalController.post.bind(AnimalController));

/**
 * @swagger
 * /animals:
 *  put:
 *    summary: Update a animal
 *    security:
 *      - okta: []
 *    tags:
 *      - animal
 *    requestBody:
 *      description: Animal object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Animal'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A animal object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: animal updated
 *                profile:
 *                  $ref: '#/components/schemas/Animal'
 */
router.put('/', authRequired, fileUploadHandler.single('animal_picture'), AnimalController.put.bind(AnimalController));

/**
 * @swagger
 * /animals/{id}:
 *  delete:
 *    summary: Remove a animal
 *    security:
 *      - okta: []
 *    tags:
 *      - animal
 *    parameters:
 *      - $ref: '#/components/parameters/animalId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A animal object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Animal '750dd31c-9d2f-48c0-b5ca-a8d487863456' was deleted.
 *                animal:
 *                  $ref: '#/components/schemas/Animal'
 */
router.delete('/:id', authRequired, AnimalController.del.bind(AnimalController));

module.exports = router;