/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
    await knex.schema.alterTable("games",function(table) {
        table.dropColumn('number_to_guess');
    });
    await knex.schema.alterTable("games", function(table) {
        table.string('number_to_guess', 4).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {

};
