/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
    
export async function up(knex){
    await knex.schema.createTable('games', function(table) {
        table.bigIncrements('id').primary();
        table.integer('number_to_guess').notNullable().checkBetween([1234, 9876]);
        table.bigInteger('number_of_attempts').notNullable().defaultTo(0); 
        table.timestamp('start_time').notNullable().defaultTo(knex.fn.now(6));;
        table.timestamp('end_time').notNullable().defaultTo(knex.fn.now(6));;
      })
      .createTable('scores', function(table) {
        table.bigIncrements('id').primary();
        table.string('user_name').notNullable();
        table.bigInteger('game_id').unsigned().notNullable();
        table.foreign('game_id').references('games.id').onDelete('cascade');
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
