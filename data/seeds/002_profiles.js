const faker = require('faker');
const getLocations = require('./../utils/locations');
const axios = require('axios');

faker.locale = 'en_US';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(async function () {
      const locations = await getLocations();
      const faces = (
        await axios.get('https://uifaces.co/api', {
          method: 'GET',
          headers: {
            'X-API-KEY': 'E268CA33-9EFA419D-BD2C2C9D-ED0AC9D8',
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
      ).data;
      // create data
      const profiles = [];
      for (let i = 1; i < 9; i++) {
        const item = {
          id: i === 1 ? '00ulthapbErVUwVJy4x6' : `user${i}_id`,
          avatarUrl: faces[i].photo,
          email: `llama00${i}@maildrop.cc`,
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          user_type: Array.from(Array(6), (e, i) => i + 1).includes(i)
            ? 'dc885650-0de0-11eb-8250-a5697c93ae91'
            : '035f3a60-0de0-11eb-93e6-ddb47fc994e4',
          phone: faker.phone.phoneNumber('(###) ###-####'),
          address: locations[i - 1].address,
          city: locations[i - 1].city,
          state: locations[i - 1].state,
          zip_code: parseInt(locations[i - 1].zip_code),
          latitude: locations[i - 1].lat,
          longitude: locations[i - 1].lng,
        };
        profiles.push(item);
      }

      return knex('profiles').insert(profiles);
    });
};
