const objectFiler = (obj, cb) => {
  const result = new Map();
  for (const key of Object.keys(obj)) {
    /**
     * The callback has as params the object key and value
     * if callback has result is true, we add key value pair in the map result
     */
    if (cb(key, obj[key])) result[key] = obj[key];
  }

  // then return the map
  return result;
};

module.exports = objectFiler;
