const AlunoRepository = require('../repositories/AlunoRepository');

class AlunoService {
    // Retorna a lista de alunos processando paginação, filtros e ordenação
    async listar(query) {
        // Extrai parâmetros da URL ou define valores padrão
        const { page = 1, limit = 10, filter, sort = 'id', order = 'ASC' } = query;
        
        // Calcula a partir de qual registro o Sequelize deve iniciar a busca
        const offset = (page - 1) * limit;

        // Chama o repositório com os parâmetros devidamente tratados
        return await AlunoRepository.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            filter,
            sort,
            order: order.toUpperCase() // Garante que a ordem seja ASC ou DESC
        });
    }
    // Busca um aluno e pode lançar um erro caso ele não exista
    async buscarPorId(id) {
        const aluno = await AlunoRepository.findById(id);
        if (!aluno) {
            throw new Error("Aluno não encontrado no sistema.");
        }
        return aluno;
    }
    // Valida se os campos obrigatórios estão presentes antes de criar
    async criar(dados) {
        if (!dados.nome || !dados.email) {
            throw new Error("Nome e e-mail são obrigatórios.");
        }
        return await AlunoRepository.create(dados);
    }
    // Gerencia a atualização dos dados
    async atualizar(id, dados) {
        const aluno = await AlunoRepository.update(id, dados);
        if (!aluno) throw new Error("Aluno não encontrado para atualização.");
        return aluno;
    }
    // Gerencia a exclusão
    async remover(id) {
        const deletado = await AlunoRepository.delete(id);
        if (!deletado) throw new Error("Aluno não encontrado para remoção.");
        return deletado;
    }
}

module.exports = new AlunoService();