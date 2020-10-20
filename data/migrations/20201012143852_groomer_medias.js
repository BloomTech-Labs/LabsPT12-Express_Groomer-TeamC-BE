exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomer_medias', (table) => {
      table.string('id').notNullable().unique().primary();
      table
        .string('groomer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('groomers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('url').notNullable();
      table.string('description').nullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('groomer_medias');
};
