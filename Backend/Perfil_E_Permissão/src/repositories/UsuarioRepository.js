const db = require('../database/connection');

class UsuarioRepository {
    // Busca um usuário pelo nome (útil no login)
    async findByUsername(username) {
        return await db('usuarios').where({ username }).first();
    }
    // Insere um novo usuário no banco
    async create(userData) {
        return await db('usuarios').insert(userData).returning('*');
    }
}
module.exports = new UsuarioRepository();