const MatriculaRepository = require('../repositories/MatriculaRepository');
const sequelize = require('../database/connection'); // Importado para gerenciar a transação

class MatriculaService {
    // Cria uma matricula (Agora usando Managed Transaction)
    async matricular(alunoId, cursoId) {
        // Iniciamos a transação gerenciada do Sequelize
        return await sequelize.transaction(async (t) => {
            // 1. Verifica se o aluno já está matriculado (dentro da transação 't')
            const existe = await MatriculaRepository.findPair(alunoId, cursoId, t);
            if (existe) {
                throw new Error("O aluno já está matriculado neste curso.");
            }

            // Exemplo de Falha Parcial: Se o alunoId for 777, forçamos o Rollback para demonstrar consistência
            if (alunoId === 777) {
                throw new Error("Falha simulada: Sistema de registros indisponível no Sequelize.");
            }

            // 2. Se não existir, cria a matricula passando o objeto 't'
            return await MatriculaRepository.create(alunoId, cursoId, t);
        });
    }

    // Lista filtrada por aluno
    async listarPorAluno(id_aluno) {
        return await MatriculaRepository.findByAlunoId(id_aluno);
    }

    // Lista todas as matriculas
    async listarTodas() {
        return await MatriculaRepository.findAll();
    }

    // Gerencia a exclusão (Agora usando Managed Transaction)
    async cancelar(id) {
        return await sequelize.transaction(async (t) => {
            const resultado = await MatriculaRepository.delete(id, t);
            if (!resultado) throw new Error("Matrícula não encontrada.");
            return resultado;
        });
    }
}

module.exports = new MatriculaService();