exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomer_services', (table) => {
      table.string('id').notNullable().unique().primary();
      table
        .string('groomer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('groomers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('service_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('services')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('service_hours').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('groomer_services');
};
