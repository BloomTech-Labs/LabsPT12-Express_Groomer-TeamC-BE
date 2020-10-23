const express = require('express')
const SearchController = require('./searchController')
const authRequired = require('./../middleware/authRequired')

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Result:
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
 *  parameters:
 *      groomerQueryString:
 *          name: q
 *          in: query
 *          required: true
 *          schema:
 *              type: string
 *          description: The string to search
 *          example: /search/groomers?q=NC
 * 
 * 
 * /search/groomers:
 *  get:
 *      description: return list of groomers corresponding to the query
 *      summary: Search for groomers by name, city, state
 *      security:
 *          - okta: []
 *      tags:
 *          - searchGroomer
 *      parameters:
 *          - $ref: '#/components/parameters/groomerQueryString'
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
router.get('/groomers', authRequired, SearchController.searchGroomers.bind(SearchController));

module.exports = router;