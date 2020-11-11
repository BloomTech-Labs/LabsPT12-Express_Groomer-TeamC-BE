exports.up = function (knex) {
  return knex.schema.createTable('appointment_services', (table) => {
    table.string('id').notNullable().unique().primary();
    table
      .string('appointment_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('appointments')
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
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('appointment_services');
};
