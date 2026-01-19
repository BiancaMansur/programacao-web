const db = require('../database/connection');

class AlunoRepository {
    // Lista todos os alunos com suporte a paginação, filtros e ordenação
    async findAll({ limit, offset, filter, sort, order }) { 
        // Cria a query base
        const query = db('alunos').select('*');

        // Aplica filtros dinâmicos se houver um termo de busca
        if (filter) {
            query.where(function() {
                this.where('nome', 'ilike', `%${filter}%`)
                    .orWhere('email', 'ilike', `%${filter}%`);
            });
        }

        // Aplica ordenação segura verificando os campos permitidos
        const colunasPermitidas = ['id', 'nome', 'email'];
        if (colunasPermitidas.includes(sort)) {
            query.orderBy(sort, order || 'asc');
        }

        // Aplica a paginação
        query.limit(limit).offset(offset);
        
        const data = await query;
        const total = await db('alunos').count('id as count').first();

        return {
            dados: data,
            total: parseInt(total.count)
        };
    }
    // Busca um aluno pelo ID.
    async findById(id) {
        return await db('alunos').where({ id }).first();
    }
    // Cria um aluno
    async create(dados) {
        const [novoAluno] = await db('alunos').insert(dados).returning('*');
        return novoAluno;
    }
    // Atualiza um aluno
    async update(id, dadosAtualizados) {
        const [alunoAtualizado] = await db('alunos')
            .where({ id })
            .update(dadosAtualizados)
            .returning('*');
        return alunoAtualizado;
    }
    // Remove um aluno
    async delete(id) { 
        return await db('alunos').where({ id }).del(); 
    }
}

module.exports = new AlunoRepository();