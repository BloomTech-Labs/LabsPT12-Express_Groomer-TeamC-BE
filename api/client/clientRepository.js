const Repository = require('./../models/Repository');
const Profile = require('./../models/profile');
const AnimalRepository = require('./../animal/animalRepository');
const UserTypeRepository = require('./../userType/userTypeRepository');
const createHttpError = require('http-errors');
const AppointmentRepository = require('./../appointment/appointmentRepository');
const RatingRepository = require('./../rating/ratingRepository');
const PaymentRepository = require('./../payment/paymentRepository');

class ClientRepository extends Repository {
  relationMappings = {
    animals: {
      relation: 'hasMany',
      repositoryClass: AnimalRepository,
      join: {
        from: 'profiles.id',
        to: 'animals.owner_id',
      },
    },
    appointments: {
      relation: 'hasMany',
      repositoryClass: AppointmentRepository,
      join: {
        from: 'profiles.id',
        to: 'appointments.client_id',
      },
    },
  };

  constructor() {
    super();
    this.model = Profile;
    this.properties = [
      'profiles.id',
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
      'profiles.created_at',
      'profiles.updated_at',
    ];
  }

  async getOne(id) {
    const userType = (await UserTypeRepository.getWhere({ name: 'client' }))[0];

    const result = await this.relatedOne({
      'profiles.id': id,
      user_type: userType.id,
    });
    if (!result) throw new createHttpError(404, 'Profile not found.');

    const ratings = await RatingRepository.getAverage(result.id);

    return {
      ...result,
      ratings: ratings.avg,
      ratingCount: ratings.count,
    };
  }

  /**
   * Retrieve payment history by groomer ID
   * @param {string} clientId
   */
  async getPaymentHistories(clientId) {
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
        .where({ 'appointments.client_id': clientId });

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

module.exports = new ClientRepository();
