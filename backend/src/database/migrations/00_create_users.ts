import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();

    table.string('avatar');
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

    table.string('tel').notNullable();
    table.string('cep').notNullable();
    table.string('address').notNullable();

    table.integer('jwtVersion').defaultTo(0).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
