const faker = require('faker');

const userTypeIds = [
  '035f3a60-0de0-11eb-93e6-ddb47fc994e4',
  'dc885650-0de0-11eb-8250-a5697c93ae91',
];

const profiles = [...new Array(5)].map((i, idx) => ({
  id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  user_type: userTypeIds[Math.round(Math.random())],
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
