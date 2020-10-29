const Repository = require("./../models/Repository");
const Appointment = require("./../models/appointment");
const AnimalRepository = require('./../animal/animalRepository');
const createHttpError = require("http-errors");

class AppointmentRepository extends Repository {
    
    constructor() {
        super()
        this.model = Appointment
    }

    async beforeCreate(payload, param) {
        // security check
        await this.cuSecurityCheck(payload, param.context)

        return payload
    }

    async afterCreate(result) {
        return result[0]
    }

    async beforeUpdate(id, payload, param) {
        // security check
        console.log(payload)
        await this.cuSecurityCheck(payload, param.context)

        return payload
    }

    async afterUpdate(result) {
        return result[0]
    }

    async beforeRemove(id, param) {
        /**
         * Only client who made the appointment can cancel an appointment.
         */
        const appointment = await this.getOne(id);
        
        if (appointment.client_id !== param.context.profile.id)
            throw createHttpError(403, 'Operation not allowed. You cannot cancel this appointment.')

        return appointment.id
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
        if (!payload.client_id || !payload.groomer_id)
            throw createHttpError(400, '"client_id" and "groomer_id" are required.');

        if (payload.client_id === payload.groomer_id)
            throw createHttpError(400, 'The "client_id" should be different to the "groomer_id".');

        if (payload.client_id !== context.profile.id)
            throw createHttpError(403, 'Operation not allowed. You cannot schedule/reschedule an appointment with a different ID.')
    
        /**
         * check if the animal is own by the client
         */
        const animal = (await AnimalRepository.model.query().where({ id: payload.animal_id, owner_id: payload.client_id }).first());

        if (!animal) throw createHttpError(403, 'Operation not allowed. Only animal\'s owner can schedule/reschedule appointment with this animal')
    }

    
}

module.exports = new AppointmentRepository()