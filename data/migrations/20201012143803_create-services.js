exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('services', (table) => {
      table.string('id').notNullable().unique().primary();
      table.string('name').notNullable();
      table.string('description');
      table.float('cost').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('services');
};
