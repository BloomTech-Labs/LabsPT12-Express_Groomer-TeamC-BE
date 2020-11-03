
exports.up = function(knex) {
  return knex.schema.alterTable('profiles', table => {
      table.decimal('latitude', 10, 8).nullable();
      table.decimal('longitude', 11, 8).nullable();
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('profiles', table => {
      table.dropColumn('latitude');
      table.dropColumn('longitude');
  })
};
