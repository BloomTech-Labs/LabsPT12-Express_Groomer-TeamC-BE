exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('animals', (table) => {
      table.string('id').notNullable().unique().primary();
      table
        .string('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('name').notNullable();
      table.string('animal_type').notNullable();
      table.string('breed').notNullable();
      table.string('weight').nullable();
      table.string('picture').nullable();
      table.text('comment').nullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('animals');
};
