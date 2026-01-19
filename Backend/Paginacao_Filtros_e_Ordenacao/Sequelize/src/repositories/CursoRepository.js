const Curso = require('../models/Curso');

class CursoRepository {
    // Lista todos os cursos com suporte a paginação, filtros e ordenação
    async findAll({ limit, offset, filter, sort, order }) {
        // Recupera o operador Op anexado ao model
        const { Op } = Curso;
        const where = {};

        // Aplica filtro dinâmico por nome do curso caso exista um termo de busca
        if (filter) {
            where.nome = { [Op.iLike]: `%${filter}%` };
        }

        // Executa a busca dinâmica com contagem total de registros
        const { count, rows } = await Curso.findAndCountAll({
            where,
            limit,
            offset,
            order: [[sort, order || 'ASC']] // Aplica a ordenação segura
        });

        // Retorna os dados e o total para controle de paginação no Service
        return {
            dados: rows,
            total: count
        };
    }
    // Busca um curso por ID
    async findById(id) {
        return await Curso.findByPk(id);
    }
    // Cria um curso
    async create(dados) {
        return await Curso.create(dados);
    }
    // Atualiza um curso
    async update(id, dados) {
        const curso = await Curso.findByPk(id);
        if (curso) {
            return await curso.update(dados);
        }
        return null;
    }
    // Remove um curso
    async delete(id) {
        return await Curso.destroy({ where: { id } });
    }
}

module.exports = new CursoRepository();