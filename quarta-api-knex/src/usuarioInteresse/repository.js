const db = require('../database/knex');

class UsuarioInteresseRepository {
    async findAll() {
        return await db('usuarios_interesses').select('*');
    }

    async findById(id) {
        return await db('usuarios_interesses').where({ id }).first();
    }

    async findByUsuario(usuario_id) {
        return await db('usuarios_interesses').where({ usuario_id });
    }

    async insert(dados) {
        return await db('usuarios_interesses').insert(dados);
    }

    async update(id, dados) {
        return await db('usuarios_interesses').where({ id }).update(dados);
    }

    async delete(id) {
        return await db('usuarios_interesses').where({ id }).del();
    }
}

module.exports = new UsuarioInteresseRepository();