const knex = require('./../../data/db-config');
const Groomer = require('./../../api/models/groomer');
const Service = require('./../../api/models/services');
const GroomerService = require('./../../api/models/groomer_service');
const Validator = require('./../../api/models/Validator');

describe('testing model "GroomerService"', () => {
  afterAll(async () => {
    // await GroomerService.del()
  });
  describe('persist data', () => {
    it('should successful create new groomer service', async () => {
      const service = (await Service.findAll())[0];
      const groomer = (await Groomer.findAll())[0];

      const data = {
        groomer_id: groomer.id,
        service_id: service.id,
        service_hours: 'Mon-Fri 9am - 5pm',
      };

      const response = await GroomerService.create(data);

      expect(response.length).toBe(1);
      expect(response[0]).toEqual(expect.objectContaining(data));
    });

    it('should successful update groomer service entry corresponding to the specified ID', async () => {
      const groomerService = (await GroomerService.findAll())[0];

      const result = await GroomerService.update(groomerService.id, {
        ...groomerService,
        service_hours: 'Mon-Thu 9am - 5pm',
      });

      expect(result).toHaveLength(1);
      expect(result[0].service_hours).toBe('Mon-Thu 9am - 5pm');
    });
  });

  describe('retrieve data', () => {
    it('findAll: should return all entries in the database table', async () => {
      expect((await GroomerService.findAll()).length).toBe(1);
    });
    it('findById: should return row entry corresponding to the specified ID', async () => {
      const groomerService = (await GroomerService.findAll())[0];
      expect(await GroomerService.findById(groomerService.id)).toEqual(
        groomerService
      );
    });
  });

  describe('delete data', () => {
    it('should delete row in the database table corresponding with the specified ID', async () => {
      const groomerService = (await GroomerService.findAll())[0];
      // console.log(groomer)
      await GroomerService.remove(groomerService.id);

      expect(await GroomerService.findById(groomerService.id)).toBeUndefined();
      expect((await GroomerService.findAll()).length).toBe(0);
    });
  });

  describe('data type validation', () => {
    it('should failed if not required fields', async () => {
      const result = await GroomerService.create({});

      expect(result.length).toBe(3);
      expect(result[0].message).toBe('requires property "groomer_id"');
      expect(result[1].message).toBe('requires property "service_id"');
      expect(result[2].message).toBe('requires property "service_hours"');
    });

    it('should failed if invalid data type', async () => {
      const data = {
        groomer_id: 5,
        service_id: 5,
        service_hours: 6,
      };
      GroomerService.validator = new Validator(knex); // rest validator
      const result = await GroomerService.create(data);

      expect(result.length).toBe(3);
      expect(result[0].message).toBe('is not of a type(s) string');
      expect(result[0].message).toBe('is not of a type(s) string');
      expect(result[2].message).toBe('is not of a type(s) string');
    });
  });

  describe('check if data exist in the database', () => {
    it('should failed if incorrect groomer_id', async () => {
      const service = (await Service.findAll())[0];
      const data = {
        groomer_id: 'groomer.id',
        service_id: service.id,
        service_hours: 'Mon-Fri 9am - 5pm',
      };
      GroomerService.validator = new Validator(knex);
      const result = await GroomerService.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[groomer_id] with value: [groomer.id] does not exists in table: [groomers], column: [id]'
      );
    });
    it('should failed if incorrect service_id', async () => {
      const groomer = (await Groomer.findAll())[0];
      const data = {
        groomer_id: groomer.id,
        service_id: 'service.id',
        service_hours: 'Mon-Fri 9am - 5pm',
      };
      GroomerService.validator = new Validator(knex);
      const result = await GroomerService.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[service_id] with value: [service.id] does not exists in table: [services], column: [id]'
      );
    });
  });
});
