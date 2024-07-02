/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
    
export async function up(knex){
    await knex.schema.createTable('games', function(table) {
        table.bigIncrements('id').primary();
        table.integer('number').notNullable();
        table.bigInteger('attempts').notNullable(); 
        table.timestamp('start_time').notNullable();
        table.timestamp('end_time').notNullable();
      })
      .createTable('scores', function(table) {
        table.bigIncrements('id').primary();
        table.string('name').notNullable();
        table.bigInteger('game_id').unsigned().notNullable();
        table.foreign('game_id').references('games.id');
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTable('scores');
    await knex.schema.dropTable('games');

  };
