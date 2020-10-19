const faker = require('faker');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomer_services')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomer_services').insert([
        {
          id: faker.random.alphaNumeric(20),
          groomer_id: '00ulthapbErVUwVJt48x7',
          service_id: '11ulthapbErVUwVJt58x0',
          service_hours: 'Mon-Fri 9am - 5pm',
        },
      ]);
    });
};
