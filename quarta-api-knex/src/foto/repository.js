const db = require('../database/knex');

class FotoRepository {
    async findAll() {
        return await db('fotos').select('*');
    }

    async findById(id) {
        return await db('fotos').where({ id }).first();
    }

    async findByUsuario(usuario_id) {
        return await db('fotos').where({ usuario_id });
    }

    async insert(dados) {
        return await db('fotos').insert(dados);
    }

    async update(id, dados) {
        return await db('fotos').where({ id }).update(dados);
    }

    async delete(id) {
        return await db('fotos').where({ id }).del();
    }
}

module.exports = new FotoRepository();