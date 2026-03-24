exports.up = function(knex) {
  return knex.schema.createTable('usuarios_interesses', table => {
    table.increments('id').primary();
    table.integer('usuario_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
    table.integer('interesse_id').unsigned().references('id').inTable('interesses').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios_interesses');
};