exports.up = function(knex) {
  return knex.schema.createTable('fotos', table => {
    table.increments('id').primary();
    table.string('url').notNullable();
    table.boolean('foto_perfil').defaultTo(false);
    table.integer('usuario_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('fotos');
};