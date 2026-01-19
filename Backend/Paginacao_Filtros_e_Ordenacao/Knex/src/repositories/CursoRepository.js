const db = require('../database/connection');

class CursoRepository {
    // Lista todos os cursos com suporte a paginação, filtros e ordenação
    async findAll({ limit, offset, filter, sort, order }) { 
        // Cria a query base
        const query = db('cursos').select('*');

        // Aplica filtros dinâmicos se houver um termo de busca no nome
        if (filter) {
            query.where('nome', 'ilike', `%${filter}%`);
        }

        // Aplica ordenação segura verificando os campos permitidos
        const colunasPermitidas = ['id', 'nome', 'cargaHoraria'];
        if (colunasPermitidas.includes(sort)) {
            query.orderBy(sort, order || 'asc');
        }

        // Aplica a paginação
        query.limit(limit).offset(offset);
        const data = await query;
        const total = await db('cursos').count('id as count').first();

        return {
            dados: data,
            total: parseInt(total.count)
        };
    }
    // Busca um curso por ID
    async findById(id) { 
        return await db('cursos').where({ id }).first(); 
    }
    // Cria um curso
    async create(dados) {
        const [novo] = await db('cursos')
            .insert({
                nome: dados.nome,
                cargaHoraria: dados.cargaHoraria
            })
            .returning('*');
        return novo;
    }
    // Atualiza um curso
    async update(id, dados) {
        const [atualizado] = await db('cursos')
            .where({ id })
            .update(dados)
            .returning('*');
        return atualizado;
    }
    // Remove um curso
    async delete(id) { 
        return await db('cursos').where({ id }).del(); 
    }
}

module.exports = new CursoRepository();