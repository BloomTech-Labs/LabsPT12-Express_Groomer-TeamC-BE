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
    address: '1300 Evans Ave Ste 30',
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

const getGeocode = async (address) => {
  const result = await geocode(address);

  return {
    address: result.formatted,
    city: result.components.city || result.components.town,
    state: result.components.state_code,
    zip_code: result.components.postcode,
    country: result.components.country,
    lat: result.geometry.lat,
    lng: result.geometry.lng,
  };
};

const getLocations = async () => {
  const locations = [];

  for (const address of addresses) {
    const rawFormattedAddress = `${address.address}, ${address.city}, ${address.state}`;

    const data = await getGeocode(rawFormattedAddress);
    locations.push(data);
  }

  return locations;
};

module.exports = getLocations;
