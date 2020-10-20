const faker = require('faker');
const knex = require('./../../data/db-config');
const UserType = require('./../../api/models/userType');
const Validator = require('./../../api/models/Validator');

describe('testing model "UserType"', () => {
  describe('persist data', () => {
    it('should successful create new user type', async () => {
      const data = {
        name: faker.name.jobType(),
      };
      const result = await UserType.create(data);

      expect(result.length).toBe(1);
      expect(result[0].id).toBeDefined();
      expect(result[0]).toEqual(expect.objectContaining(data));
    });

    it('should successful update user type table row corresponding to the specified ID', async () => {
      const userType = (await UserType.findAll())[2];

      const newName = faker.name.jobType();

      const result = await UserType.update(userType.id, {
        ...userType,
        name: newName,
      });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(newName);
    });
  });

  describe('retrieve data', () => {
    it('should return all rows', async () => {
      expect((await UserType.findAll()).length).toBe(3);
    });
    it('should return row corresponding to the specified ID', async () => {
      const userType = (await UserType.findAll())[0];
      expect(await UserType.findById(userType.id)).toEqual(userType);
    });
  });

  describe('delete data', () => {
    it('should delete row corresponding with the specified ID', async () => {
      const userType = (await UserType.findAll())[2];
      await UserType.remove(userType.id);

      expect(await UserType.findById(userType.id)).toBeUndefined();
      expect((await UserType.findAll()).length).toBe(2);
    });
  });

  describe('data type validation', () => {
    it('should failed if not required fields', async () => {
      UserType.validator = new Validator(knex); // rest validator
      const result = await UserType.create({});

      expect(result.length).toBe(1);
      expect(result[0].message).toBe('requires property "name"');
    });

    it('should failed if incorrect data types', async () => {
      const data = {
        name: 895,
      };
      UserType.validator = new Validator(knex); // rest validator
      const result = await UserType.create(data);

      expect(result.length).toBe(1);
      expect(result[0].message).toBe('is not of a type(s) string');
    });
  });
});
