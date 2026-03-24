exports.up = function(knex) {
  return knex.schema.createTable('mensagens', table => {
    table.increments('id').primary();
    table.integer('match_id').unsigned().references('id').inTable('matches').onDelete('CASCADE');
    table.integer('usuario_envio').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
    table.text('conteudo').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('mensagens');
};