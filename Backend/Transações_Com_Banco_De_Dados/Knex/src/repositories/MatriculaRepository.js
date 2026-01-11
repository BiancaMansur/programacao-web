const db = require('../database/connection');

class MatriculaRepository {
    // Lista todas as matriculas
    async findAll() { 
        return await db('matriculas').select('*'); 
    }
    
    // Lista as matriculas de um aluno pelo ID
    async findByAlunoId(aluno_id) {
        return await db('matriculas').where({ aluno_id }).select('*');
    }
    
    // Verifica se o par aluno/curso já existe (evita duplicados)
    async findByPair(aluno_id, curso_id) {
        // Consultas de verificação também podem usar trx se necessário para isolamento
        return await db('matriculas').where({ aluno_id, curso_id }).first();
    }
    
    // Cria uma matricula (Unificado: aceita transação opcional)
    async create(aluno_id, curso_id, trx = db) {
        // Se 'trx' for fornecido pelo Service, o Knex vincula a query à transação
        const [nova] = await trx('matriculas')
            .insert({ aluno_id, curso_id })
            .returning('*');
        return nova;
    }
    
    // Remove uma matrícula pelo ID (Agora aceita transação opcional)
    async delete(id, trx = db) {
        return await trx('matriculas').where({ id }).del();
    }
}

module.exports = new MatriculaRepository();