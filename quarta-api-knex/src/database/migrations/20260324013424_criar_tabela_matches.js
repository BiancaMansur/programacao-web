exports.up = function(knex) {
  return knex.schema.createTable('matches', table => {
    table.increments('id').primary();
    table.integer('usuario_1').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
    table.integer('usuario_2').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('matches');
};