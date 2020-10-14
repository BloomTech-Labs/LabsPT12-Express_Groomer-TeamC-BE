exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_types')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user_types').insert([
        { id: '035f3a60-0de0-11eb-93e6-ddb47fc994e4', name: 'client' },
        { id: 'dc885650-0de0-11eb-8250-a5697c93ae91', name: 'groomer' },
      ]);
    });
};
