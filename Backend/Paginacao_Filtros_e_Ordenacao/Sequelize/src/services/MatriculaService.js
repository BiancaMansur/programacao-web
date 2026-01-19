const MatriculaRepository = require('../repositories/MatriculaRepository');

class MatriculaService {
    // Cria uma matricula
    async matricular(alunoId, cursoId) {
        // Verifica se o aluno já está matriculado neste curso
        const existe = await MatriculaRepository.findPair(alunoId, cursoId);
        if (existe) {
            throw new Error("O aluno já está matriculado neste curso.");
        }
        // Se não existir, cria a matricula
        return await MatriculaRepository.create(alunoId, cursoId);
    }
    // Lista filtrada por aluno
    async listarPorAluno(id_aluno) {
        return await MatriculaRepository.findByAlunoId(id_aluno);
    }
    // Lista todas as matriculas com lógica de paginação e filtros
    async listarTodas(query) {
        // Extrai parâmetros da URL ou define valores padrão
        const { page = 1, limit = 10, filter, sort = 'id', order = 'ASC' } = query;

        // Calcula o deslocamento (offset) para a paginação
        const offset = (page - 1) * limit;

        // Chama o repositório passando os parâmetros processados
        return await MatriculaRepository.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            filter,
            sort,
            order: order.toUpperCase()
        });
    }
    // Gerencia a exclusão
    async cancelar(id) {
        const resultado = await MatriculaRepository.delete(id);
        if (!resultado) throw new Error("Matrícula não encontrada.");
        return resultado;
    }
}

module.exports = new MatriculaService();