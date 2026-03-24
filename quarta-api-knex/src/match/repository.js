const db = require('../database/knex');

class MatchRepository {
    async findAll() {
        return await db('matches').select('*');
    }

    async findById(id) {
        return await db('matches').where({ id }).first();
    }

    async findByUsuarios(usuario_id_1, usuario_id_2) {
        return await db('matches')
            .where(function() {
                this.where('usuario_id_1', usuario_id_1).andWhere('usuario_id_2', usuario_id_2);
            })
            .orWhere(function() {
                this.where('usuario_id_1', usuario_id_2).andWhere('usuario_id_2', usuario_id_1);
            })
            .first();
    }

    async insert(dados) {
        return await db('matches').insert(dados);
    }

    async update(id, dados) {
        return await db('matches').where({ id }).update(dados);
    }

    async delete(id) {
        return await db('matches').where({ id }).del();
    }
}

module.exports = new MatchRepository();