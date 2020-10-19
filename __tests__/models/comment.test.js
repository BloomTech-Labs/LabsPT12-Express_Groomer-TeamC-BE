const faker = require('faker');
const knex = require('./../../data/db-config');
const Comment = require('./../../api/models/comment');
const Profile = require('./../../api/models/profile');
const Validator = require('./../../api/models/Validator');

describe('testing model "Comment"', () => {
  describe('persist data', () => {
    it('should successful create new comment', async () => {
      const data = {
        author: (await Profile.findAll())[0].id,
        groomer_id: (await Profile.findAll())[1].id,
        body: faker.lorem.sentences(),
      };

      const result = await Comment.create(data);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expect.objectContaining(data));
    });

    it('should successful update comment entry corresponding to the specified ID', async () => {
      const newBody = faker.lorem.sentences();

      const comment = (await Comment.findAll())[0];

      const data = {
        ...comment,
        body: newBody,
      };

      const result = await Comment.update(comment.id, data);

      expect(result).toHaveLength(1);
      expect(result[0].body).toBe(newBody);
    });
  });

  describe('retrieve data', () => {
    it('findAll: should return all entries in the database table', async () => {
      expect((await Comment.findAll()).length).toBe(1);
    });
    it("findById: should return row entry corresponding to the specified ID in this case 'undefined'", async () => {
      const comment = (await Comment.findAll())[0];
      expect(await Comment.findById(comment.id)).toEqual(comment);
    });
  });

  describe('delete data', () => {
    it('should delete row in the database table corresponding with the specified ID', async () => {
      const comment = (await Comment.findAll())[0];
      // console.log(comment)
      await Comment.remove(comment.id);

      expect(await Comment.findById(comment.id)).toBeUndefined();
      expect((await Comment.findAll()).length).toBe(0);
    });
  });

  describe('data type validation', () => {
    it('should failed if not required fields', async () => {
      const result = await Comment.create({});

      expect(result.length).toBe(3);
      expect(result[0].message).toBe('requires property "author"');
      expect(result[1].message).toBe('requires property "groomer_id"');
      expect(result[2].message).toBe('requires property "body"');
    });

    it('should failed if invalid data type', async () => {
      const data = {
        author: 5,
        groomer_id: 5,
        body: 5,
      };
      Comment.validator = new Validator(knex); // rest validator
      const result = await Comment.create(data);

      expect(result.length).toBe(3);
      expect(result[0].message).toBe('is not of a type(s) string');
      expect(result[1].message).toBe('is not of a type(s) string');
      expect(result[2].message).toBe('is not of a type(s) string');
    });
  });

  describe('check if data exist in the database', () => {
    it('should failed if incorrect author', async () => {
      const data = {
        author: 'author.id',
        groomer_id: (await Profile.findAll())[1].id,
        body: faker.lorem.sentences(),
      };
      Comment.validator = new Validator(knex);
      const result = await Comment.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[author] with value: [author.id] does not exists in table: [profiles], column: [id]'
      );
    });
    it('should failed if incorrect author', async () => {
      const data = {
        author: (await Profile.findAll())[0].id,
        groomer_id: 'groomer.id',
        body: faker.lorem.sentences(),
      };
      Comment.validator = new Validator(knex);
      const result = await Comment.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[groomer_id] with value: [groomer.id] does not exists in table: [profiles], column: [id]'
      );
    });
  });
});
