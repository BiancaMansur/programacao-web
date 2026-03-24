exports.up = function(knex) {
  return knex.schema.createTable('interesses', table => {
    table.increments('id').primary();
    table.string('descricao', 50).notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('interesses');
};