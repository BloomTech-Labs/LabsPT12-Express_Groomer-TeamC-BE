const faker = require('faker');
const knex = require('./../../data/db-config');
const Animal = require('./../../api/models/animal');
const Profile = require('./../../api/models/profile');
const Validator = require('./../../api/models/Validator');

describe('testing model "Animal"', () => {
  afterAll(async () => {
    // await Animal.del()
  });
  describe('persist data', () => {
    it('should successful create new animal', async () => {
      const profile = (await Profile.findAll())[1];
      const data = {
        owner_id: profile.id,
        name: faker.name.findName(),
        animal_type: 'dog',
        breed: 'bulldog',
        weight: '155',
      };

      const result = await Animal.create(data);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expect.objectContaining(data));
    });

    it('should successful update animal entry corresponding to the specified ID', async () => {
      const animal = (await Animal.findAll())[0];

      const newData = {
        name: faker.name.findName(),
        animal_type: faker.name.title(),
        breed: faker.name.jobType(),
        weight: '156',
        picture: faker.image.animals(),
        comment: faker.lorem.sentence(),
      };

      const result = await Animal.update(animal.id, {
        ...animal,
        ...newData,
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(expect.objectContaining(newData));
    });
  });

  describe('retrieve data', () => {
    it('findAll: should return all entries in the database table', async () => {
      expect((await Animal.findAll()).length).toBe(2);
    });
    it("findById: should return row entry corresponding to the specified ID in this case 'undefined'", async () => {
      const animal = (await Animal.findAll())[0];
      expect(await Animal.findById(animal.id)).toEqual(animal);
    });
  });

  describe('delete data', () => {
    it('should delete row in the database table corresponding with the specified ID', async () => {
      const animal = (await Animal.findAll())[1];
      // console.log(Animal)
      await Animal.remove(animal.id);

      expect(await Animal.findById(animal.id)).toBeUndefined();
      expect((await Animal.findAll()).length).toBe(1);
    });
  });

  describe('data type validation', () => {
    it('should failed if not required fields', async () => {
      const result = await Animal.create({});

      expect(result.length).toBe(4);
      expect(result[0].message).toBe('requires property "owner_id"');
      expect(result[1].message).toBe('requires property "name"');
      expect(result[2].message).toBe('requires property "animal_type"');
      expect(result[3].message).toBe('requires property "breed"');
    });

    it('should failed if invalid data type', async () => {
      const data = {
        owner_id: 5,
        name: 45,
        animal_type: 3,
        breed: 5,
        weight: 3,
        picture: 'hhggf',
        comment: 5,
      };
      Animal.validator = new Validator(knex); // rest validator
      const result = await Animal.create(data);

      expect(result.length).toBe(7);
      expect(result[0].message).toBe('is not of a type(s) string');
      expect(result[1].message).toBe('is not of a type(s) string');
      expect(result[2].message).toBe('is not of a type(s) string');
      expect(result[3].message).toBe('is not of a type(s) string');
      expect(result[4].message).toBe('is not of a type(s) string');
      expect(result[5].message).toBe('does not conform to the "uri" format');
      expect(result[6].message).toBe('is not of a type(s) string');
    });
  });

  describe('check if data exist in the database', () => {
    it('should failed if incorrect profile_id', async () => {
      const data = {
        owner_id: 'profile.id',
        name: faker.name.findName(),
        animal_type: 'dog',
        breed: 'bulldog',
        weight: '155',
      };
      Animal.validator = new Validator(knex);
      const result = await Animal.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[owner_id] with value: [profile.id] does not exists in table: [profiles], column: [id]'
      );
    });
  });
});
