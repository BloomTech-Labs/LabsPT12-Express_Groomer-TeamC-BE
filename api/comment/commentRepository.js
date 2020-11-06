const Repository = require('./../models/Repository');
const Comment = require('./../models/comment');
const createHttpError = require('http-errors');

class CommentRepository extends Repository {
  constructor() {
    super();
    this.model = Comment;
  }

  async afterCreate(result) {
    return result[0];
  }

  async beforeUpdate(id, payload, params) {
    // Only comment's author can update
    try {
      const result = await this.getWhere({
        'comments.id': id,
        'comments.author': params.context.profile.id,
      });

      if (!result.length)
        throw createHttpError(
          400,
          'Cannot update comment with the specified id.'
        );

      return {
        ...result[0],
        ...payload,
      };
    } catch (error) {
      throw createHttpError(
        error.statusCode || 500,
        error.message ||
          'An Unknown error occurred while trying to update comment.'
      );
    }
  }

  async afterUpdate(result) {
    return result[0];
  }

  async beforeRemove(id, params) {
    // Only comment's author can delete
    const result = await this.getWhere({
      'comments.id': id,
      'comments.author': params.context.profile.id,
    });

    if (!result.length)
      throw createHttpError(
        404,
        'Cannot delete comment with the specified id. Comment not found.'
      );

    return result[0].id;
  }
}

module.exports = new CommentRepository();
