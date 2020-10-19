const knex = require('./../../data/db-config');
const Rating = require('./../../api/models/ratings');
const Profile = require('./../../api/models/profile');
const Validator = require('./../../api/models/Validator');

describe('testing model "Rating"', () => {
  describe('persist data', () => {
    it('should successful create new rating', async () => {
      const profile = (await Profile.findAll())[1];
      const data = {
        user_id: profile.id,
        rating: 3.5,
      };

      const result = await Rating.create(data);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expect.objectContaining(data));
    });
  });

  describe('retrieve data', () => {
    it('findAll: should return all entries in the database table', async () => {
      expect((await Rating.findAll()).length).toBe(1);
    });
  });

  describe('data type validation', () => {
    it('should failed if not required fields', async () => {
      const result = await Rating.create({});

      expect(result.length).toBe(2);
      expect(result[0].message).toBe('requires property "user_id"');
      expect(result[1].message).toBe('requires property "rating"');
    });

    it('should failed if invalid data type', async () => {
      const data = {
        user_id: 5,
        rating: '54ff',
      };
      Rating.validator = new Validator(knex); // rest validator
      const result = await Rating.create(data);

      expect(result.length).toBe(2);
      expect(result[0].message).toBe('is not of a type(s) string');
      expect(result[1].message).toBe('is not of a type(s) number');
    });
  });

  describe('check if data exist in the database', () => {
    it('should failed if incorrect profile_id', async () => {
      const data = {
        user_id: '585',
        rating: 3.5,
      };
      Rating.validator = new Validator(knex);
      const result = await Rating.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[user_id] with value: [585] does not exists in table: [profiles], column: [id]'
      );
    });
  });
});
