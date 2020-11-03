const opencage = require('opencage-api-client');

/**
 * Convert address to coordinates and reverse
 * @param {string} location address string or coordinates string
 */
const geocode = async (location) => {
  try {
    // api call to convert data
    const result = await opencage.geocode({ q: location, language: 'en' });

    // if api call status code is different throw an error
    // other wise return the result
    if (result.status.code !== 200)
      throw new Error(data.status.message || 'open cage api call failed.');

    return result.results[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = geocode;
