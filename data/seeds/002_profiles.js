const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {
          id: '00ulthapbErVUwVJy4x6',
          avatarUrl: faker.image.avatar(),
          email: 'llama001@maildrop.cc',
          name: 'Kole Hane',
          user_type: 'dc885650-0de0-11eb-8250-a5697c93ae91',
        },
        {
          id: 'user2_id',
          avatarUrl: faker.image.avatar(),
          email: 'llama002@maildrop.cc',
          name: 'Patricia King',
          user_type: 'dc885650-0de0-11eb-8250-a5697c93ae91',
        },
        {
          id: 'user3_id',
          avatarUrl: faker.image.avatar(),
          email: 'llama003@maildrop.cc',
          name: 'Garland Baumbach',
          user_type: 'dc885650-0de0-11eb-8250-a5697c93ae91',
        },
        {
          id: 'user4_id',
          avatarUrl: faker.image.avatar(),
          email: 'llama004@maildrop.cc',
          name: 'Arvel Bernier',
          user_type: 'dc885650-0de0-11eb-8250-a5697c93ae91',
        },
        {
          id: 'user5_id',
          avatarUrl: faker.image.avatar(),
          email: 'llama005@maildrop.cc',
          name: 'Daphney Goldner',
          user_type: 'dc885650-0de0-11eb-8250-a5697c93ae91',
        },
        {
          id: 'user6_id',
          avatarUrl: faker.image.avatar(),
          email: 'llama006@maildrop.cc',
          name: 'Tim Leon',
          user_type: 'dc885650-0de0-11eb-8250-a5697c93ae91',
        },
        {
          id: 'user7_id',
          avatarUrl: faker.image.avatar(),
          email: 'llama007@maildrop.cc',
          name: 'Martin Mark',
          user_type: '035f3a60-0de0-11eb-93e6-ddb47fc994e4',
        },
        {
          id: 'user8_id',
          avatarUrl: faker.image.avatar(),
          email: 'llama008@maildrop.cc',
          name: 'Mary Love',
          user_type: '035f3a60-0de0-11eb-93e6-ddb47fc994e4',
        },
      ]);
    });
};
