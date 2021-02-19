import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('address').notNullable();
    table.string('name').notNullable();
    table.string('tel');
    table.string('avatar');
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}