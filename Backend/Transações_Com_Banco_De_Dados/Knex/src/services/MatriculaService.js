const MatriculaRepository = require('../repositories/MatriculaRepository');
const AlunoRepository = require('../repositories/AlunoRepository');
const CursoRepository = require('../repositories/CursoRepository');
const db = require('../database/connection');

class MatriculaService {
    // Listagem global
    async listarTodas() { 
        return await MatriculaRepository.findAll(); 
    }

    // Listagem filtrada por aluno
    async listarPorAluno(id_aluno) {
        const aluno = await AlunoRepository.findById(id_aluno);
        if (!aluno) throw new Error("Aluno não encontrado.");
        return await MatriculaRepository.findByAlunoId(id_aluno);
    }

    // Realiza a matrícula (Agora transacional por padrão)
    async matricular(alunoId, cursoId) {
        // Iniciamos a transação para garantir que as verificações e a inserção sejam atômicas
        return await db.transaction(async (trx) => {
            try {
                // 1. Verifica existência do aluno e do curso
                const aluno = await AlunoRepository.findById(alunoId);
                const curso = await CursoRepository.findById(cursoId);

                if (!aluno || !curso) {
                    throw new Error("Aluno ou Curso inexistente.");
                }

                // 2. Verifica se já existe matrícula ativa (Evita duplicidade)
                const jaExiste = await MatriculaRepository.findByPair(alunoId, cursoId);
                if (jaExiste) {
                    throw new Error("O aluno já está matriculado neste curso.");
                }

                // 3. Efetiva a matrícula passando o objeto trx para o repositório
                // Note que usamos o método 'create' unificado
                const novaMatricula = await MatriculaRepository.create(alunoId, cursoId, trx);

                // Gatilho de Rollback para teste
                if (alunoId === 777) {
                    throw new Error("Falha parcial simulada: Sistema de registros indisponível.");
                }

                return novaMatricula;

            } catch (error) {
                // O Knex desfaz as alterações automaticamente em caso de erro
                console.error("Erro no processo de matrícula:", error.message);
                throw error;
            }
        });
    }

    // Gerencia a exclusão (Também transacional para segurança)
    async cancelar(id) {
        return await db.transaction(async (trx) => {
            try {
                const deletado = await MatriculaRepository.delete(id, trx);
                if (!deletado) throw new Error("Matrícula não encontrada.");
                return deletado;
            } catch (error) {
                console.error("Erro ao cancelar matrícula:", error.message);
                throw error;
            }
        });
    }
}

module.exports = new MatriculaService();