exports.up = function (knex) {
  return knex.schema.createTable('payment_histories', (table) => {
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
      .references('profile_id')
      .inTable('groomers')
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
    table.float('amount').notNullable();
    table.string('payment_method').nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('payment_histories');
};
