const faker = require('faker');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('animals')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        {
          id: 'animal1_id',
          owner_id: 'user7_id',
          name: faker.name.findName(),
          animal_type: 'dog',
          breed: 'bulldog',
          weight: '155',
        },
        {
          id: 'animal2_id',
          owner_id: 'user7_id',
          name: faker.name.findName(),
          animal_type: 'cat',
          breed: 'american bobtail',
          weight: '10',
        },
        {
          id: 'animal3_id',
          owner_id: 'user8_id',
          name: faker.name.findName(),
          animal_type: 'dog',
          breed: 'husky',
          weight: '90',
        },
        {
          id: 'animal4_id',
          owner_id: 'user7_id',
          name: faker.name.findName(),
          animal_type: 'cat',
          breed: 'birman',
          weight: '12',
        },
        {
          id: 'animal5_id',
          owner_id: 'user8_id',
          name: faker.name.findName(),
          animal_type: 'dog',
          breed: 'chiwawa',
          weight: '20',
        },
        {
          id: 'animal6_id',
          owner_id: 'user7_id',
          name: faker.name.findName(),
          animal_type: 'rabbit',
          breed: 'lionhead rabbit',
          weight: '25',
        },
        {
          id: 'animal7_id',
          owner_id: 'user8_id',
          name: faker.name.findName(),
          animal_type: 'cat',
          breed: 'american curl',
          weight: '15',
        },
      ]);
    });
};
