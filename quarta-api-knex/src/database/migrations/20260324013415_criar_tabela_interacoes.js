exports.up = function(knex) {
  return knex.schema.createTable('interacoes', table => {
    table.increments('id').primary();
    table.integer('usuario_remetente').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
    table.integer('usuario_destinatario').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
    table.boolean('curtiu').notNullable(); // true = like, false = dislike
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('interacoes');
};