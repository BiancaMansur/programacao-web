exports.up = function(knex) {
  return knex.schema.createTable('enderecos', table => {
    table.increments('id').primary();

    table.integer('usuario_id').unsigned().notNullable()
         .references('id').inTable('usuarios')
         .onDelete('CASCADE'); 
    table.string('logradouro', 150).notNullable();
    table.string('numero', 10);
    table.string('complemento', 50);
    table.string('bairro', 100);
    table.string('cidade', 100);
    table.string('estado', 50);
    table.string('cep', 15);
    table.decimal('latitude', 9, 6); // Conforme solicitado
    table.decimal('longitude', 9, 6);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('enderecos');
};