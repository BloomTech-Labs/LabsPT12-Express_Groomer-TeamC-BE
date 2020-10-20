exports.up = function (knex) {
  return knex.schema.alterTable('profiles', (table) => {
    table.unique('email');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('profiles');
};
