exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomers').insert([
        {
          id: '00ulthapbErVUwVJt48x7',
          profile_id: '00ulthapbErVUwVJy4x6',
          travel: true,
          travel_distance: 50,
        },
        {
          id: 'profile2_id',
          profile_id: 'user2_id',
          travel: false,
          travel_distance: 0,
        },
        {
          id: 'profile3_id',
          profile_id: 'user3_id',
          travel: false,
          travel_distance: 0,
        },
        {
          id: 'profile4_id',
          profile_id: 'user4_id',
          travel: true,
          travel_distance: 20,
        },
        {
          id: 'profile5_id',
          profile_id: 'user5_id',
          travel: false,
          travel_distance: 0,
        },
        {
          id: 'profile6_id',
          profile_id: 'user6_id',
          travel: true,
          travel_distance: 30,
        },
      ]);
    });
};
