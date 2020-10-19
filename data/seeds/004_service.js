const faker = require('faker');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('services')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('services').insert([
        {
          id: faker.random.alphaNumeric(20),
          name: 'Bath & Full Haircut',
          description: faker.lorem.sentence(),
          cost: 19.99,
        },
      ]);
    });
};
