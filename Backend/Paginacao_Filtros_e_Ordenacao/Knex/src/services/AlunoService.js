const AlunoRepository = require('../repositories/AlunoRepository');

class AlunoService {
    // Retorna a lista de alunos com lógica de paginação e filtros
    async listarTodos(query) { 
        // Extrai os parâmetros da query ou define valores padrão
        const { page = 1, limit = 10, filter, sort = 'id', order = 'asc' } = query;

        // Calcula o offset para a paginação
        const offset = (page - 1) * limit;

        // Chama o repositório passando os parâmetros processados
        return await AlunoRepository.findAll({ 
            limit: parseInt(limit), 
            offset: parseInt(offset), 
            filter, 
            sort, 
            order 
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
    async criarAluno(dados) {
        if (!dados.nome || !dados.email) {
            throw new Error("Nome e Email são campos obrigatórios.");
        }
        return await AlunoRepository.create(dados);
    }
    // Gerencia a atualização dos dados
    async atualizarAluno(id, dados) {
        const alunoExiste = await AlunoRepository.findById(id);
        if (!alunoExiste) throw new Error("Não é possível atualizar: Aluno inexistente.");
        return await AlunoRepository.update(id, dados);
    }
    // Gerencia a exclusão
    async removerAluno(id) {
        return await AlunoRepository.delete(id);
    }
}

module.exports = new AlunoService();