const faker = require('faker');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('groomers').del()
    .then(function () {
      // Inserts seed entries
      return knex('groomers').insert([
        {id: faker.random.alphaNumeric(20), profile_id: "00ulthapbErVUwVJy4x6", travel: true, travel_distance: 50},
      ]);
    });
};
