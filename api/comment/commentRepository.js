const Repository = require('./../models/Repository');
const createHttpError = require('http-errors');
const Comment = require('./../models/comment');
const ProfileRepository = require('./../profile/profileRepository');

class CommentRepository extends Repository {
  relationMappings = {
    author: {
      relation: 'hasOne',
      repositoryClass: ProfileRepository,
      join: {
        from: 'comments.author',
        to: 'profiles.id',
      },
    },
  };

  constructor() {
    super();
    this.model = Comment;
    this.properties = [
      'comments.id',
      'comments.author as authorId',
      'profiles.name as authorName',
      'profiles.avatarUrl as authorAvatar',
      'comments.groomer_id',
      'comments.body',
      'comments.created_at',
      'comments.updated_at',
    ];
  }

  async get() {
    return await this.relatedAll();
  }

  async getOne(id) {
    const result = await this.relatedOne({ 'comments.id': id });

    if (!result)
      throw createHttpError(404, 'Comment with the specified ID not found.');

    return result;
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
