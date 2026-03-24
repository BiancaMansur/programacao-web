const db = require('../database/knex');

class InteresseRepository {
    async findAll() {
        return await db('interesses').select('*');
    }

    async findById(id) {
        return await db('interesses').where({ id }).first();
    }

    async findByUsuarios(usuario_id, usuario_id_interessado) {
        return await db('interesses').where({
            usuario_id,
            usuario_id_interessado
        }).first();
    }

    async insert(dados) {
        return await db('interesses').insert(dados);
    }

    async update(id, dados) {
        return await db('interesses').where({ id }).update(dados);
    }

    async delete(id) {
        return await db('interesses').where({ id }).del();
    }
}

module.exports = new InteresseRepository();