const db = require('../database/knex');

class InteracaoRepository {
    async findAll() {
        return await db('interacoes').select('*');
    }

    async findById(id) {
        return await db('interacoes').where({ id }).first();
    }

    async findByUsuarios(usuario_id_origem, usuario_id_destino) {
        return await db('interacoes').where({
            usuario_id_origem,
            usuario_id_destino
        }).first();
    }

    async insert(dados) {
        return await db('interacoes').insert(dados);
    }

    async update(id, dados) {
        return await db('interacoes').where({ id }).update(dados);
    }

    async delete(id) {
        return await db('interacoes').where({ id }).del();
    }
}

module.exports = new InteracaoRepository();