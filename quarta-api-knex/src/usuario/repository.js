const db = require('../database/knex');

class UsuarioRepository {
  async findAll() {
    return await db('usuarios').select('*');
  }

  async findById(id) {
    return await db('usuarios').where({ id }).first();
  }

  async insert(dados) {
    return await db('usuarios').insert(dados);
  }
}

module.exports = new UsuarioRepository();