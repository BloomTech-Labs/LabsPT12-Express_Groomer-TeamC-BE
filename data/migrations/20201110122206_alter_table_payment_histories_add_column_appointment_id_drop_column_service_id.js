const { table } = require('../db-config');

exports.up = function (knex) {
  return knex.schema.alterTable('payment_histories', (table) => {
    table.dropColumn('service_id');
    table
      .string('appointment_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('appointments')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
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
    table.dropColumn('appointment_id');
  });
};
