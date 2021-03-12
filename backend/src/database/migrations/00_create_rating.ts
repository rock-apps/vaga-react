import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('rating', table => {
    table.increments('id').primary();
    table.integer('rate').notNullable();
    table.string('comment').notNullable();
    table.integer('product_id').notNullable();

    table.integer('user_id').notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('rating');
}
