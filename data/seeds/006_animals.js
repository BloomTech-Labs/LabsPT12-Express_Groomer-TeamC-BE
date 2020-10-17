const faker = require("faker")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('animals').del()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {
          id: faker.random.alphaNumeric(20),
          owner_id: "00ulthapbErVUwVJy4x6",
          name: faker.name.findName(),
          animal_type: "dog",
          breed: "bulldog",
          weight: "155",
        }
      ]);
    });
};
