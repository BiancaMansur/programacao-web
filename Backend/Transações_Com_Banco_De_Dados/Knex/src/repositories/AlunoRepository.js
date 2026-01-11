const db = require('../database/connection');

class AlunoRepository {
    // Lista todos os alunos
    async findAll() {
        return await db('alunos').select('*');
    }

    // Busca um aluno pelo ID.
    async findById(id) {
        return await db('alunos').where({ id }).first();
    }

    // Cria um aluno (Aceita transação opcional)
    async create(dados, trx = db) {
        // Se 'trx' for passado, ele usa a transação; se não, usa o 'db' padrão
        const [novoAluno] = await trx('alunos')
            .insert(dados)
            .returning('*');
        return novoAluno;
    }

    // Atualiza um aluno (Aceita transação opcional)
    async update(id, dadosAtualizados, trx = db) {
        const [alunoAtualizado] = await trx('alunos')
            .where({ id })
            .update(dadosAtualizados)
            .returning('*');
        return alunoAtualizado;
    }

    // Remove um aluno (Aceita transação opcional)
    async delete(id, trx = db) {
        return await trx('alunos')
            .where({ id })
            .del();
    }
}

module.exports = new AlunoRepository();