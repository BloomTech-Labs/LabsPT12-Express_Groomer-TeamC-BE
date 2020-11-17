const Controller = require('./../controllers');
const CommentRepository = require('./commentRepository');

class CommentController extends Controller {}

module.exports = new CommentController(CommentRepository);
