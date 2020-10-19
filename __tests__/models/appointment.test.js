const faker = require('faker');
const knex = require('./../../data/db-config');
const Appointment = require('./../../api/models/appointment');
const Profile = require('./../../api/models/profile');
// const Service = require('./../../api/models/services');
// const Groomer = require('./../../api/models/groomer');
const GroomerService = require('./../../api/models/groomer_service');
const Animal = require('./../../api/models/animal');
const Validator = require('./../../api/models/Validator');

describe('testing model "Appointment"', () => {
  describe('persist data', () => {
    it('should successful create new appointment', async () => {
      const profile = (await Profile.findAll())[1];
      const groomer = (await Profile.findAll())[0];
      const animal = (await Animal.findAll())[0];

      // // create groomer service
      // const serviceData = {
      //   groomer_id: (await Groomer.findAll())[0].id,
      //   service_id: (await Service.findAll())[0].id,
      //   service_hours: 'Mon-Fri 9am - 5pm',
      // };
      // await GroomerService.create(serviceData);

      const groomerService = (await GroomerService.findAll())[0];

      const data = {
        client_id: profile.id,
        groomer_id: groomer.id,
        service_id: groomerService.id,
        animal_id: animal.id,
        appointment_date: '2018-11-13T20:20:39+00:00',
        location: faker.address.streetAddress(),
      };

      const result = await Appointment.create(data);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBeDefined();
      expect(result[0].location).toEqual(data.location);
    });

    it('should successful update appointment entry corresponding to the specified ID', async () => {
      const appointment = (await Appointment.findAll())[0];

      const newLocation = faker.address.streetAddress();

      const result = await Appointment.update(appointment.id, {
        ...appointment,
        appointment_date: '2018-11-13T20:20:39+00:00', // converted to datetime object by query builder
        location: newLocation,
      });

      expect(result).toHaveLength(1);
      expect(result[0].location).toBe(newLocation);
    });
  });

  describe('retrieve data', () => {
    it('findAll: should return all entries in the database table', async () => {
      expect((await Appointment.findAll()).length).toBe(1);
    });
    it("findById: should return row entry corresponding to the specified ID in this case 'undefined'", async () => {
      const appointment = (await Appointment.findAll())[0];
      expect(await Appointment.findById(appointment.id)).toEqual(appointment);
    });
  });

  describe('delete data', () => {
    it('should delete row in the database table corresponding with the specified ID', async () => {
      const appointment = (await Appointment.findAll())[0];
      // console.log(Appointment)
      await Appointment.remove(appointment.id);

      expect(await Appointment.findById(appointment.id)).toBeUndefined();
      expect((await Appointment.findAll()).length).toBe(0);
    });
  });

  describe('data type validation', () => {
    it('should failed if not required fields', async () => {
      const result = await Appointment.create({});
      Appointment.validator = new Validator(knex); // rest validator
      expect(result.length).toBe(6);
      expect(result[0].message).toBe('requires property "client_id"');
      expect(result[1].message).toBe('requires property "groomer_id"');
      expect(result[2].message).toBe('requires property "service_id"');
      expect(result[3].message).toBe('requires property "animal_id"');
      expect(result[4].message).toBe('requires property "appointment_date"');
      expect(result[5].message).toBe('requires property "location"');
    });

    it('should failed if invalid data type', async () => {
      const data = {
        client_id: 5,
        groomer_id: 5,
        service_id: 5,
        animal_id: 5,
        appointment_date: '2018-11-13T20',
        location: 5,
      };
      Appointment.validator = new Validator(knex); // rest validator
      const result = await Appointment.create(data);

      expect(result.length).toBe(6);
      expect(result[0].message).toBe('is not of a type(s) string');
      expect(result[1].message).toBe('is not of a type(s) string');
      expect(result[2].message).toBe('is not of a type(s) string');
      expect(result[3].message).toBe('is not of a type(s) string');
      expect(result[4].message).toBe(
        'does not conform to the "date-time" format'
      );
      expect(result[5].message).toBe('is not of a type(s) string');
    });
  });

  describe('check if data exist in the database', () => {
    it('should failed if incorrect client_id', async () => {
      const groomer = (await Profile.findAll())[0];
      const groomerService = (await GroomerService.findAll())[0];
      const animal = (await Animal.findAll())[0];

      const data = {
        client_id: 'profile.id',
        groomer_id: groomer.id,
        service_id: groomerService.id,
        animal_id: animal.id,
        appointment_date: '2018-11-13T20:20:39+00:00',
        location: faker.address.streetAddress(),
      };
      Appointment.validator = new Validator(knex); // rest validator
      const result = await Appointment.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[client_id] with value: [profile.id] does not exists in table: [profiles], column: [id]'
      );
    });
    it('should failed if incorrect groomer_id', async () => {
      const profile = (await Profile.findAll())[1];
      const groomerService = (await GroomerService.findAll())[0];
      const animal = (await Animal.findAll())[0];

      const data = {
        client_id: profile.id,
        groomer_id: 'groomer.id',
        service_id: groomerService.id,
        animal_id: animal.id,
        appointment_date: '2018-11-13T20:20:39+00:00',
        location: faker.address.streetAddress(),
      };
      Appointment.validator = new Validator(knex); // rest validator
      const result = await Appointment.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[groomer_id] with value: [groomer.id] does not exists in table: [profiles], column: [id]'
      );
    });
    it('should failed if incorrect service_id', async () => {
      const profile = (await Profile.findAll())[1];
      const groomer = (await Profile.findAll())[0];
      const animal = (await Animal.findAll())[0];

      const data = {
        client_id: profile.id,
        groomer_id: groomer.id,
        service_id: 'groomerService.id',
        animal_id: animal.id,
        appointment_date: '2018-11-13T20:20:39+00:00',
        location: faker.address.streetAddress(),
      };

      Appointment.validator = new Validator(knex); // rest validator
      const result = await Appointment.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[service_id] with value: [groomerService.id] does not exists in table: [groomer_services], column: [id]'
      );
    });
    it('should failed if incorrect animal_id', async () => {
      const profile = (await Profile.findAll())[1];
      const groomer = (await Profile.findAll())[0];
      const groomerService = (await GroomerService.findAll())[0];

      const data = {
        client_id: profile.id,
        groomer_id: groomer.id,
        service_id: groomerService.id,
        animal_id: 'animal.id',
        appointment_date: '2018-11-13T20:20:39+00:00',
        location: faker.address.streetAddress(),
      };
      Appointment.validator = new Validator(knex); // rest validator
      const result = await Appointment.create(data);

      expect(result.length).toBe(1);
      expect(result[0].detail).toBe(
        '[animal_id] with value: [animal.id] does not exists in table: [animals], column: [id]'
      );
    });
  });
});
