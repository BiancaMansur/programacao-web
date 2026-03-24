const db = require('../database/knex');

class EnderecoRepository {
    async findAll() {
        return await db('enderecos').select('*');
    }

    async findById(id) {
        return await db('enderecos').where({ id }).first();
    }

    async insert(dados) {
        return await db('enderecos').insert({
            ...dados,
            latitude: parseFloat(dados.latitude),
            longitude: parseFloat(dados.longitude)
        });
    }

    async update(id, dados) {
        return await db('enderecos').where({ id }).update(dados);
    }

    async delete(id) {
        return await db('enderecos').where({ id }).del();
    }
}

module.exports = new EnderecoRepository();