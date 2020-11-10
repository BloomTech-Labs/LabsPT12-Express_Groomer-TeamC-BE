const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const { hasCommentPermission } = require('./../middleware/permissions');
const CommentController = require('./commentController');

/**
 * @swagger
 * components:
 *  schemas:
 *      Comment:
 *          type: object
 *          required:
 *              - author
 *              - groomer_id
 *              - body
 *          properties:
 *              author:
 *                  type: string
 *                  description: profile id
 *              groomer_id:
 *                  type: string
 *                  description: groomer profile id
 *              body:
 *                  type: string
 *          example:
 *              author: 'e645d740-3256-4f53-9c17-d7545b7cdd74'
 *              groomer_id: 'a5484d769-5896-t456-9c17-d7545b7ccc25'
 *              bio: 'Nice service and customer service'
 *
 *
 * /comments:
 *  get:
 *      description: return list of comments
 *      summary: Get a list of comments
 *      security:
 *          - okta: []
 *      tags:
 *          - comment
 *      responses:
 *          200:
 *              description: array fo comments
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Comment'
 *                          example:
 *                              - id: '"e645d740-3256-4f53-9c17-d7545b7cdd74'
 *                                authorId: 'user7_id'
 *                                authorName: 'Martin Mark'
 *                                authorAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/airskylar/128.jpg'
 *                                groomer_id: 'a5484d769-5896-t456-9c17-d7545b7ccc25'
 *                                bio: 'Nice service and customer service'
 *                              - id: '"e645d740-3256-4f53-9c17-d7545b7cdd74'
 *                                authorId: 'user8_id'
 *                                authorName: 'Andre Premier'
 *                                authorAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/airskylar/128.jpg'
 *                                groomer_id: 'a5484d769-5896-t456-9c17-d7545b7ccc25'
 *                                bio: 'Very professional, my pet love it.'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, CommentController.index.bind(CommentController));

/**
 * @swagger
 * components:
 *  parameters:
 *      commentId:
 *          name: id
 *          in: path
 *          description: ID of comment to return
 *          required: true
 *          example: 750dd31c-9d2f-48c0-b5ca-a8d487863456
 *          schema:
 *              type: string
 *
 *
 * /comments/{id}:
 *  get:
 *      description: Find comment by profile ID
 *      summary: Returns a single comment
 *      security:
 *          - okta: []
 *      tags:
 *          - comment
 *      parameters:
 *          - $ref: '#/components/parameters/commentId'
 *      response:
 *          200:
 *              description: A comment object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Comment'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', authRequired, CommentController.get.bind(CommentController));

/**
 * @swagger
 * /comments:
 *  post:
 *    summary: Add a comment
 *    security:
 *      - okta: []
 *    tags:
 *      - comment
 *    requestBody:
 *      description: Comment object to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Comment not found'
 *      200:
 *        description: A comment object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: comment created
 *                profile:
 *                  $ref: '#/components/schemas/Comment'
 */
router.post(
  '/',
  authRequired,
  hasCommentPermission,
  CommentController.post.bind(CommentController)
);

/**
 * @swagger
 * /comments:
 *  put:
 *    summary: Update a comment
 *    security:
 *      - okta: []
 *    tags:
 *      - comment
 *    requestBody:
 *      description: Comment object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A comment object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: comment updated
 *                profile:
 *                  $ref: '#/components/schemas/Comment'
 */
router.put(
  '/',
  authRequired,
  hasCommentPermission,
  CommentController.put.bind(CommentController)
);

/**
 * @swagger
 * /comments/{id}:
 *  delete:
 *    summary: Remove a comment
 *    security:
 *      - okta: []
 *    tags:
 *      - comment
 *    parameters:
 *      - $ref: '#/components/parameters/commentId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A comment object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Comment '750dd31c-9d2f-48c0-b5ca-a8d487863456' was deleted.
 *                comment:
 *                  $ref: '#/components/schemas/Comment'
 */
router.delete(
  '/:id',
  authRequired,
  hasCommentPermission,
  CommentController.del.bind(CommentController)
);

module.exports = router;
