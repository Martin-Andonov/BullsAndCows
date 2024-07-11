/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable("games",function(table) {
        table.dropColumn('number_of_attempts');
    });
    await knex.schema.alterTable('scores', function(table) {
        table.bigInteger('number_of_attempts').notNullable().defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.alterTable("scores",function(table) {
        table.dropColumn('number_of_attempts');
    });
    await knex.schema.alterTable('games', function(table) {
        table.bigInteger('number_of_attempts').notNullable().defaultTo(0);
    });
};
