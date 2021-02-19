import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.string('order_id').notNullable();
    table.string('capture_id').notNullable();
    table.string('created_at').notNullable();
    
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('orders');
}