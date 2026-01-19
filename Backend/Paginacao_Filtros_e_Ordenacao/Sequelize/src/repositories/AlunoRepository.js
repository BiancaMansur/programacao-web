const Aluno = require('../models/Aluno');

class AlunoRepository {
    // Lista todos os alunos com suporte a paginação, filtros e ordenação
    async findAll({ limit, offset, filter, sort, order }) {
        // Recupera o operador Op anexado ao model
        const { Op } = Aluno;
        const where = {};

        // Aplica filtro dinâmico por nome ou e-mail caso exista um termo de busca
        if (filter) {
            where[Op.or] = [
                { nome: { [Op.iLike]: `%${filter}%` } },
                { email: { [Op.iLike]: `%${filter}%` } }
            ];
        }

        // Executa a busca dinâmica com contagem total de registros
        const { count, rows } = await Aluno.findAndCountAll({
            where,
            limit,
            offset,
            order: [[sort, order || 'ASC']] // Aplica a ordenação segura
        });

        // Retorna os dados formatados para o Service
        return {
            dados: rows,
            total: count
        };
    }
    // Busca um aluno pelo ID.
    async findById(id) {
        return await Aluno.findByPk(id);
    }
    // Cria um aluno
    async create(dados) {
        return await Aluno.create(dados);
    }
    // Atualiza um aluno
    async update(id, dados) {
        const aluno = await Aluno.findByPk(id);
        if (aluno) {
            return await aluno.update(dados);
        }
        return null;
    }
    // Remove um aluno
    async delete(id) {
        return await Aluno.destroy({ where: { id } });
    }
}

module.exports = new AlunoRepository();