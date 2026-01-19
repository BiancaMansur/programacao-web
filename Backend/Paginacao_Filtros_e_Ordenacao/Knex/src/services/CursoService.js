const CursoRepository = require('../repositories/CursoRepository');

class CursoService {
    // Retorna a lista de cursos com lógica de paginação e filtros
    async listarTodos(query) { 
        // Extrai os parâmetros da query ou define valores padrão
        const { page = 1, limit = 10, filter, sort = 'id', order = 'asc' } = query;

        // Calcula o offset para a paginação
        const offset = (page - 1) * limit;

        // Chama o repositório passando os parâmetros processados
        return await CursoRepository.findAll({ 
            limit: parseInt(limit), 
            offset: parseInt(offset), 
            filter, 
            sort, 
            order 
        }); 
    }
    // Valida a existência do curso antes de retornar
    async buscarPorId(id) {
        const curso = await CursoRepository.findById(id);
        if (!curso) {
            throw new Error("Curso não encontrado.");
        }
        return curso;
    }
    // Valida os dados antes da criação no banco
    async criarCurso(dados) {
        if (!dados.nome || dados.cargaHoraria <= 0) {
            throw new Error("Dados inválidos: Nome obrigatório e carga horária deve ser positiva.");
        }
        return await CursoRepository.create(dados);
    }
    // Verifica se o curso existe antes de tentar atualizar
    async atualizarCurso(id, dados) {
        const cursoExiste = await CursoRepository.findById(id);
        if (!cursoExiste) throw new Error("Não é possível atualizar: Curso inexistente.");
        
        return await CursoRepository.update(id, dados);
    }
    // Gerencia a exclusão
    async removerCurso(id) {
        return await CursoRepository.delete(id);
    }
}

module.exports = new CursoService();