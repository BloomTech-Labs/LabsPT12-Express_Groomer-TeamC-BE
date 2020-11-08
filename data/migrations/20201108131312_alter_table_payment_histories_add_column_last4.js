exports.up = function (knex) {
  return knex.schema.alterTable('payment_histories', (table) => {
    table.string('last4').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('payment_histories', (table) => {
    table.dropColumn('last4');
  });
};
