const faker = require('faker');
const knex = require('./../../data/db-config');
const Groomer = require('./../../api/models/groomer');
const GroomerMedia = require('./../../api/models/groomer_media');
const Validator = require('./../../api/models/Validator');

describe('testing model "GroomerMedia"', () => {
  describe('persist data', () => {
    it('should successful create new groomer media', async () => {
      const groomer = (await Groomer.findAll())[0];

      const data = {
        groomer_id: groomer.id,
        url: faker.image.avatar(),
      };

      const response = await GroomerMedia.create(data);

      expect(response.length).toBe(1);
      expect(response[0]).toEqual(expect.objectContaining(data));
    });

    it('should successful update groomer media entry corresponding to the specified ID', async () => {
      const groomerMedia = (await GroomerMedia.findAll())[0];

      const newDescription = faker.lorem.sentence();

      const result = await GroomerMedia.update(groomerMedia.id, {
        ...groomerMedia,
        description: newDescription,
      });

      expect(result).toHaveLength(1);
      expect(result[0].description).toBe(newDescription);
    });
  });

  describe('retrieve data', () => {
    it('findAll: should return all entries in the database table', async () => {
      expect((await GroomerMedia.findAll()).length).toBe(1);
    });
    it('findById: should return row entry corresponding to the specified ID', async () => {
      const groomerMedia = (await GroomerMedia.findAll())[0];
      expect(await GroomerMedia.findById(groomerMedia.id)).toEqual(
        groomerMedia
      );
    });
  });

  describe('delete data', () => {
    it('should delete row in the database table corresponding with the specified ID', async () => {
      const groomerMedia = (await GroomerMedia.findAll())[0];
      // console.log(groomer)
      await GroomerMedia.remove(groomerMedia.id);

      expect(await GroomerMedia.findById(groomerMedia.id)).toBeUndefined();
      expect((await GroomerMedia.findAll()).length).toBe(0);
    });
  });

  describe('data type validation', () => {
    it('should failed if not required fields', async () => {
      const result = await GroomerMedia.create({});

      expect(result.length).toBe(2);
      expect(result[0].message).toBe('requires property "groomer_id"');
      expect(result[1].message).toBe('requires property "url"');
    });

    it('should failed if invalid data type', async () => {
      const data = {
        groomer_id: 5,
        url: '5',
        description: 6,
      };
      GroomerMedia.validator = new Validator(knex); // rest validator
      const result = await GroomerMedia.create(data);

      expect(result.length).toBe(3);
      expect(result[0].message).toBe('is not of a type(s) string');
      expect(result[1].message).toBe('does not conform to the "uri" format');
      expect(result[2].message).toBe('is not of a type(s) string');
    });
  });

  describe('check if data exist in the database', () => {
    it('should failed if incorrect groomer_id', async () => {
      const data = {
        groomer_id: 'groomer.id',
        url: faker.image.avatar(),
      };
      GroomerMedia.validator = new Validator(knex);
      const result = await GroomerMedia.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[groomer_id] with value: [groomer.id] does not exists in table: [groomers], column: [id]'
      );
    });
  });
});
