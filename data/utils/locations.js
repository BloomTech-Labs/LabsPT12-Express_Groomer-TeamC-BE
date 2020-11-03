require('dotenv').config();
const geocode = require('./../../api/utils/geocode');

const addresses = [
  {
    address: '223 W 38th St',
    city: 'New York',
    state: 'NY',
    zip_code: 10018,
  },
  {
    address: '1300 Eva Ave Ste 30',
    city: 'San Francisco',
    state: 'CA',
    zip_code: 94188,
  },
  {
    address: '421 8th Ave',
    city: 'New York',
    state: 'NY',
    zip_code: 10001,
  },
  {
    address: '335 E 14th St',
    city: 'New York',
    state: 'NY',
    zip_code: 10009,
  },
  {
    address: '1400 Pine St',
    city: 'San Francisco',
    state: 'CA',
    zip_code: 94109,
  },
  {
    address: '150 Sutter St',
    city: 'San Francisco',
    state: 'CA',
    zip_code: 94104,
  },
  {
    address: '391 Ellis St',
    city: 'San Francisco',
    state: 'CA',
    zip_code: 94102,
  },
  {
    address: '244 E 3rd St',
    city: 'New York',
    state: 'NY',
    zip_code: 10009,
  },
];

const limit = addresses.length - 1;

const getLocation = async (index) => {
  if (index > limit) throw new Error('No location found at this index');

  const address = addresses[index];
  const rawFormattedAddress = `${address.address}, ${address.city}, ${address.state}`;

  return await geocode(rawFormattedAddress);
};

module.exports = getLocation;
