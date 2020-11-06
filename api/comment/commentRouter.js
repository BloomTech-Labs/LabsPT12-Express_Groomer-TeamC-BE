const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const { hasCommentPermission } = require('./../middleware/permissions');
const CommentController = require('./commentController');

router.get('/', authRequired, CommentController.index.bind(CommentController));
router.get('/:id', authRequired, CommentController.get.bind(CommentController));
router.post(
  '/',
  authRequired,
  hasCommentPermission,
  CommentController.post.bind(CommentController)
);
router.put(
  '/',
  authRequired,
  hasCommentPermission,
  CommentController.put.bind(CommentController)
);
router.delete(
  '/:id',
  authRequired,
  hasCommentPermission,
  CommentController.del.bind(CommentController)
);

module.exports = router;
