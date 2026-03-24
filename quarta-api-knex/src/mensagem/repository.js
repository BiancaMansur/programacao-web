const db = require('../database/knex');

class MensagemRepository {
    async findAll() {
        return await db('mensagens').select('*');
    }

    async findById(id) {
        return await db('mensagens').where({ id }).first();
    }

    async findByMatch(match_id) {
        return await db('mensagens')
            .where({ match_id })
            .orderBy('criado_em', 'asc');
    }

    async insert(dados) {
        return await db('mensagens').insert(dados);
    }

    async update(id, dados) {
        return await db('mensagens').where({ id }).update(dados);
    }

    async delete(id) {
        return await db('mensagens').where({ id }).del();
    }
}

module.exports = new MensagemRepository();