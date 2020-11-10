const { table } = require('../db-config');

exports.up = function (knex) {
  return knex.schema.alterTable('payment_histories', (table) => {
    table.dropColumn('service_id');
    table.dropColumn('client_id');
    table.dropColumn('groomer_id');
    table
      .string('appointment_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('appointments')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('payment_id').unique();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('payment_histories', (table) => {
    table
      .string('service_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('services')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
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
      .references('profile_id')
      .inTable('groomers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.dropColumn('appointment_id');
    table.dropColumn('payment_id');
  });
};
