const Repository = require('../models/Repository');
const Groomer = require('../models/groomer');
const NotFound = require('../errors/NotFound');
const UnauthorizedUser = require('../errors/UnauthorizedUser');
const Profile = require('../models/profile');
const GSRepository = require('./GroomerServiceRepository');
const ProfileRepository = require('./../profile/profileRepository');
const AppointmentRepository = require('./../appointment/appointmentRepository');
const RatingRepository = require('./../rating/ratingRepository');
const PaymentRepository = require('./../payment/paymentRepository');
const createHttpError = require('http-errors');

class GroomerRepository extends Repository {
  relationMappings = {
    profile: {
      relation: 'hasOne',
      repositoryClass: ProfileRepository,
      join: {
        from: 'groomers.profile_id',
        to: 'profiles.id',
      },
    },
    services: {
      relation: 'hasMany',
      repositoryClass: GSRepository,
      join: {
        from: 'groomers.id',
        to: 'groomer_services.groomer_id',
      },
    },
    appointments: {
      relation: 'hasMany',
      repositoryClass: AppointmentRepository,
      join: {
        from: 'groomers.profile_id',
        to: 'appointments.groomer_id',
      },
    },
  };

  constructor() {
    super();
    this.model = Groomer;
    this.properties = [
      'groomers.id',
      'groomers.profile_id',
      'profiles.name',
      'profiles.email',
      'profiles.phone',
      'profiles.avatarUrl',
      'profiles.address',
      'profiles.city',
      'profiles.state',
      'profiles.zip_code',
      'profiles.latitude',
      'profiles.longitude',
      'profiles.country',
      'groomers.travel',
      'groomers.travel_distance',
      'groomers.bio',
      'groomers.created_at',
    ];
  }

  async get() {
    const result = await this.relatedAll();
    const groomers = [];
    for (const row of result) {
      const ratings = await RatingRepository.getAverage(row.profile_id);

      groomers.push({
        ...row,
        ratings: ratings.avg,
        ratingCount: ratings.count,
      });
    }

    return groomers;
  }

  async getOne(id, params) {
    const method = params.context.method;
    const whereClose =
      method === 'PUT' ? { 'groomers.id': id } : { profile_id: id };
    const result = await this.relatedOne(whereClose);
    if (!result)
      throw new NotFound('Could not find groomer with the specified id');

    const ratings = await RatingRepository.getAverage(result.profile_id);
    return {
      ...result,
      ratings: ratings.avg,
      ratingCount: ratings.count,
    };
  }

  async beforeCreate(payload) {
    // get profile ID from the request params
    const profile_id = payload.profile_id || undefined;
    // if profile ID sis not defined return the error
    if (!profile_id) throw new NotFound('"profile_id" is required. ');

    // check if the profile is Groomer
    const groomer = await Profile.query()
      .join('user_types', 'user_types.id', 'profiles.user_type')
      .where({ 'profiles.id': profile_id })
      .select('user_types.name as userType')
      .first();
    // is not groomer throw an error
    if (!groomer || (groomer && groomer.userType !== 'groomer'))
      throw new UnauthorizedUser(
        'Access denied. Only groomer are allowed to perform this operation.'
      );

    return payload;
  }

  async afterCreate(result) {
    return result[0];
  }

  async afterUpdate(result) {
    return result[0];
  }

  /**
   * Retrieve payment history by groomer ID
   * @param {string} groomerId
   */
  async getPaymentHistories(groomerId) {
    try {
      const PModel = PaymentRepository.model; // Payment history model
      // Retrieve payment histories
      const result = await PModel.query()
        .join(
          'appointments',
          'appointments.id',
          'payment_histories.appointment_id'
        )
        .select('payment_histories.*')
        .where({ 'appointments.groomer_id': groomerId });

      return result;
    } catch (error) {
      throw createHttpError(
        error.statusCode || 500,
        error.message ||
          'An unknown error occurred while trying to retrieve payment history.'
      );
    }
  }
}

module.exports = new GroomerRepository();
