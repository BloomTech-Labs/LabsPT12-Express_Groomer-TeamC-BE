const Repository = require('./../models/Repository');
const Appointment = require('./../models/appointment');
const AService = require('./../models/appointment_service'); // AppointmentService model
const ASR = require('./as_repository'); // AppointmentServiceRepository
const AnimalRepository = require('./../animal/animalRepository');
const createHttpError = require('http-errors');

class AppointmentRepository extends Repository {
  relationMappings = {
    services: {
      relation: 'hasMany',
      repositoryClass: ASR, // AppointmentServiceRepository
      join: {
        from: 'appointments.id',
        to: 'appointment_services.appointment_id',
      },
    },
  };

  constructor() {
    super();
    this.model = Appointment;
    this.properties = [
      'appointments.id',
      'appointments.client_id as clientId',
      'profiles.name as clientName',
      'appointments.groomer_id as groomerId',
      // 'appointments.service_id as serviceId',
      'appointments.animal_id as animalId',
      'animals.animal_type as animalType',
      'animals.breed as animalBreed',
      'appointments.location',
      'appointments.appointment_date as appointmentDate',
      'appointments.created_at as createdAt',
    ];
  }

  async getWhere(whereClose) {
    if (!whereClose)
      throw createHttpError(500, 'Cannot query where of undefined.');

    const knex = this.model.knex;

    const result = await this.model
      .query()
      .where(whereClose)
      .join('profiles', 'profiles.id', 'appointments.client_id')
      .join('animals', 'animals.id', 'appointments.animal_id')
      .andWhere({ completed: false })
      .select(...this.properties);

    const appointments = [];

    for (const appointment of result) {
      // get groomer info
      const groomerInfo = await knex('profiles')
        .select('name as groomerName', 'email as groomerEmail')
        .where({ id: appointment.groomerId })
        .first();

      // get services info
      const services = await ASR.relatedAll({
        'appointment_services.appointment_id': appointment.id,
      });

      appointments.push({
        ...appointment,
        ...groomerInfo,
        services,
      });
    }

    return appointments;
  }

  async beforeCreate(payload, params) {
    // delete from the payload, it's will retrieve from params after created appointment
    const { services, ...rest } = payload;
    // services is an  array, those items will be store in the appointment_service table
    // after created appointment.
    // So, first we store the general appointment info
    // if the create and update security check pass
    await this.cuSecurityCheck(rest, params.context);

    return rest;
  }

  async afterCreate(result, params) {
    try {
      // get services from the express request object in the params
      let services = params.context.body.services;
      // services is an array of string, map services through to convert that to array of object
      // containing service_id and appointment_id
      services = services.map((service_id) => ({
        service_id,
        appointment_id: result[0].id,
      }));

      // call service create method to insert services
      const insertedServices = await AService.create(services);
      // if errors delete create appointment and return errors
      if (!insertedServices) {
        this.remove(result[0].id, params);
        return insertedServices;
      }
      // return created appointment + services
      return {
        ...result[0],
        services: insertedServices,
      };
    } catch (error) {
      // remove crated appointment
      console.log(error);
      this.remove(result[0].id, params);
      // prase message error
      error.statusCode = error.statusCode || 500;
      error.message =
        error.statusCode === 500
          ? 'An unknown error occurred while trying to process appointment services. Appointment was deleted'
          : error.message;
      throw createHttpError(error.statusCode, error.message);
    }
  }

  async beforeUpdate(id, payload, param) {
    try {
      // security check
      await this.cuSecurityCheck(payload, param.context);

      return payload;
    } catch (error) {}
  }

  async afterUpdate(result) {
    return result[0];
  }

  async beforeRemove(id, param) {
    /**
     * Only client who made the appointment can cancel an appointment.
     */
    const appointment = await this.getOne(id);

    if (!this.checkAppointmentRelated(appointment, param.context))
      throw createHttpError(
        403,
        'Operation not allowed. You cannot cancel this appointment.'
      );

    return appointment.id;
  }

  /**
   * Security apply for Create and Updated (CU) operation
   * Ensure that client id si different to groomer_id in the body
   * Ensure the client id in body is the same with the authenticated.
   * Authenticate user can make or update an appointment only for him/her self.
   * @param {object} payload request body
   * @param {object} context request
   */
  async cuSecurityCheck(payload, context) {
    if (payload.client_id === payload.groomer_id)
      throw createHttpError(
        400,
        'The "client_id" should be different to the "groomer_id".'
      );

    if (!this.checkAppointmentRelated(payload, context))
      throw createHttpError(
        403,
        'Operation not allowed. You cannot schedule/reschedule an appointment with a different ID.'
      );

    /**
     * check if the animal is own by the client
     */
    const animal = await AnimalRepository.model
      .query()
      .where({ id: payload.animal_id, owner_id: payload.client_id })
      .first();

    if (!animal)
      throw createHttpError(
        403,
        "Operation not allowed. Only animal's owner can schedule/reschedule appointment with this animal"
      );
  }

  /**
   * Appointment related mean, users (groomer and client) that are concern on this appointment
   * For data security purpose authenticate groomer can create an appointment only for him/her
   * and same for the authenticate client users, they can make an appointment only for him/her
   * Only groomer or client user related to an appointment can delete this appointment
   * @param {object} payload request body
   * @param {object} context request object form controller
   */
  checkAppointmentRelated(payload, context) {
    return (
      (context.profile.userTypeName === 'client' &&
        payload.client_id === context.profile.id) ||
      (context.profile.userTypeName === 'groomer' &&
        payload.groomer_id === context.profile.id)
    );
  }
}

module.exports = new AppointmentRepository();
