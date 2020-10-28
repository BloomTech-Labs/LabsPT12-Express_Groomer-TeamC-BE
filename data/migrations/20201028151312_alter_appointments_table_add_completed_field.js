
exports.up = function(knex) {
  return knex.schema.alterTable('appointments', (table) => {
      table.boolean('completed').default(false)
  })
};

exports.down = function(knex) {
    return knex.schema.alterTable('appointments', (table) => {
        table.dropColumn('completed')
    });
};
