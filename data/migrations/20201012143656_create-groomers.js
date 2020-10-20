exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomers', (table) => {
      table.string('id').notNullable().unique().primary();
      table
        .string('profile_id')
        .unique()
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('travel').notNullable();
      table.integer('travel_distance').notNullable();
      table.text('bio').nullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('groomers');
};
