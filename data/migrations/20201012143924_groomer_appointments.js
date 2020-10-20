exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('appointments', (table) => {
      table.string('id').notNullable().unique().primary();
      table
        .string('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('groomer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('service_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('groomer_services')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('animal_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('animals')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.datetime('appointment_date');
      table.string('location');
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('appointments');
};
