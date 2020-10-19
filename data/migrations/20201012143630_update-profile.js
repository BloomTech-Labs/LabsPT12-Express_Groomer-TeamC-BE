exports.up = function (knex) {
  return knex.schema.alterTable('profiles', (table) => {
    table
      .string('user_type')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user_types')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('phone').nullable();
    table.string('address').nullable();
    table.string('city').nullable();
    table.string('state').nullable();
    table.integer('zip_code').nullable();
    table.string('country').default('United States');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('profiles');
};
