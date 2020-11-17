exports.up = function (knex) {
  return knex.schema.alterTable('appointments', (table) => {
    table.dropColumn('service_id');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('appointments', (table) => {
    table
      .string('service_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('groomer_services')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};
