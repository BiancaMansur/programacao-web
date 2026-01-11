const db = require('../database/connection');

class CursoRepository {
    // Lista todos os cursos
    async findAll() { 
        return await db('cursos').select('*'); 
    }

    // Busca um curso por ID
    async findById(id) { 
        return await db('cursos').where({ id }).first(); 
    }

    // Cria um curso (Unificado: aceita transação opcional)
    async create(dados, trx = db) {
        // Se 'trx' for passado, a query roda na transação; senão, no 'db' global
        const [novo] = await trx('cursos')
            .insert({
                nome: dados.nome,
                cargaHoraria: dados.cargaHoraria
            })
            .returning('*');
        return novo;
    }

    // Atualiza um curso (Agora aceita transação opcional)
    async update(id, dados, trx = db) {
        const [atualizado] = await trx('cursos')
            .where({ id })
            .update(dados)
            .returning('*');
        return atualizado;
    }

    // Remove um curso (Agora aceita transação opcional)
    async delete(id, trx = db) { 
        return await trx('cursos').where({ id }).del(); 
    }
}

module.exports = new CursoRepository();