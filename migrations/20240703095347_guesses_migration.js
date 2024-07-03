/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
    
export async function up(knex){
    await knex.schema.createTable('guesses', function(table) {
        table.bigIncrements('id').primary(); // Primary key
        table.bigInteger('game_id').notNullable().references('id').inTable('games'); // Foreign key to games table
        table.bigInteger('bulls_count').notNullable().defaultTo(0);
        table.bigInteger('cows_count').notNullable().defaultTo(0);
        table.string('guess').notNullable().defaultTo(0);
    });
    
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    
    await knex.schema.dropTable('guesses');
  };