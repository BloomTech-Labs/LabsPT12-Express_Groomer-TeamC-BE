// Set get environment variable from .env file
var dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
// parsing decimal type to be return as float, default pg return that as string
const pg = require('pg');
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (val) =>
  val === null ? null : parseFloat(val)
);

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: '../data/migrations' },
    seeds: { directory: '../data/seeds' },
    pool: {
      min: 2,
      max: 10,
    },
    postProcessResponse: (result, queryContext) => {
      // return result;
      return result;
    },
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: '../data/migrations' },
    seeds: { directory: '../data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: '../data/migrations' },
    seeds: { directory: '../data/seeds' },
  },
};
