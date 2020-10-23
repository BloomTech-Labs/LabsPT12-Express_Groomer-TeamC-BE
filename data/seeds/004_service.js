const faker = require('faker');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('services')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('services').insert([
        {
          id: '11ulthapbErVUwVJt58x0',
          name: 'Bath & Full Haircut',
          description: faker.lorem.sentence(),
          cost: 19.99,
        },
        {
          id: 'service2_id',
          name: 'Full Grooming',
          description: faker.lorem.sentence(),
          cost: 80,
        },
        {
          id: 'service3_id',
          name: 'Partial Grooming',
          description: faker.lorem.sentence(),
          cost: 49.99,
        },
        {
          id: 'service4_id',
          name: 'Teeth Cleaning',
          description: faker.lorem.sentence(),
          cost: 25,
        },
        {
          id: 'service5_id',
          name: 'Nail Trimming',
          description: faker.lorem.sentence(),
          cost: 20.99,
        },
        {
          id: 'service6_id',
          name: 'Ear Cleaning',
          description: faker.lorem.sentence(),
          cost: 15,
        },
        {
          id: 'service7_id',
          name: 'Bow or Bandana',
          description: faker.lorem.sentence(),
          cost: 19.99,
        },
      ]);
    });
};
