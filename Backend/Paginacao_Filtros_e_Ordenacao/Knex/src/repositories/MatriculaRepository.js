const db = require('../database/connection');

class MatriculaRepository {
    // Lista todas as matriculas com suporte a paginação, filtros e ordenação
    async findAll({ limit, offset, filter, sort, order }) { 
        // Cria a query base
        const query = db('matriculas').select('*');

        // Aplica filtros dinâmicos
        if (filter && !isNaN(filter)) {
            query.where('aluno_id', filter)
                 .orWhere('curso_id', filter);
        }

        // Aplica ordenação segura verificando os campos permitidos
        const colunasPermitidas = ['id', 'aluno_id', 'curso_id'];
        if (colunasPermitidas.includes(sort)) {
            query.orderBy(sort, order || 'asc');
        }

        // Aplica a paginação
        query.limit(limit).offset(offset);
        const data = await query;
        const total = await db('matriculas').count('id as count').first();

        return {
            dados: data,
            total: parseInt(total.count)
        };
    }
    // Lista as matriculas de um aluno pelo ID
    async findByAlunoId(aluno_id) {
        return await db('matriculas').where({ aluno_id }).select('*');
    }
    // Verifica se o par aluno/curso já existe
    async findByPair(aluno_id, curso_id) {
        return await db('matriculas').where({ aluno_id, curso_id }).first();
    }
    // Cria uma matricula
    async create(aluno_id, curso_id) {
        const [nova] = await db('matriculas')
            .insert({ aluno_id, curso_id })
            .returning('*');
        return nova;
    }
    // Remove uma matrícula pelo ID
    async delete(id) {
        return await db('matriculas').where({ id }).del();
    }
}

module.exports = new MatriculaRepository();