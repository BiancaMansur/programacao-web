const Matricula = require('../models/Matricula');

class MatriculaRepository {
    // Lista todas as matrículas com suporte a paginação, filtros e ordenação
    async findAll({ limit, offset, filter, sort, order }) {
        const { Op } = Matricula;
        const where = {};

        // Filtro dinâmico: permite filtrar por aluno_id ou curso_id se o filtro for numérico
        if (filter && !isNaN(filter)) {
            where[Op.or] = [
                { aluno_id: filter },
                { curso_id: filter }
            ];
        }

        // Executa a busca com contagem total e inclui os dados das tabelas relacionadas
        const { count, rows } = await Matricula.findAndCountAll({
            where,
            include: ['aluno', 'curso'], // Mantém os relacionamentos conforme o original
            limit,
            offset,
            order: [[sort, order || 'ASC']]
        });

        // Retorna os dados e o total para o controle de páginas no Service
        return {
            dados: rows,
            total: count
        };
    }
    // Busca matriculas um aluno pelo ID
    async findByAlunoId(aluno_id) {
        return await Matricula.findAll({ 
            where: { aluno_id },
            include: ['aluno', 'curso']
        });
    }
    // Busca se já existe o par Aluno/Curso
    async findPair(aluno_id, curso_id) {
        return await Matricula.findOne({ where: { aluno_id, curso_id } });
    }
    // Cria uma matricula
    async create(aluno_id, curso_id) {
        return await Matricula.create({ aluno_id, curso_id });
    }
    // Remove uma matricula
    async delete(id) {
        return await Matricula.destroy({ where: { id } });
    }
}

module.exports = new MatriculaRepository();