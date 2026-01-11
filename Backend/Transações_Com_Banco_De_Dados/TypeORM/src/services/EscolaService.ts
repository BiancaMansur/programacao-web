import { AppDataSource } from "../database/data-source";
import { AlunoRepo, CursoRepo, MatriculaRepo } from "../repositories/EscolaRepository";
import { Aluno } from "../entities/Aluno";
import { Curso } from "../entities/Curso";
import { Matricula } from "../entities/Matricula";

export class EscolaService {
    // MÉTODOS DE ALUNO
    async listarAlunos() { return await AlunoRepo.find(); }
    
    async buscarAlunoPorId(id: number) { return await AlunoRepo.findOneBy({ id }); }

    async criarAluno(dados: any) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const novoAluno = queryRunner.manager.create(Aluno, dados);
            const salvo = await queryRunner.manager.save(novoAluno);
            
            // Gatilho de Rollback para teste
            if (dados.nome === "Erro") throw new Error("Rollback: Nome inválido simulado.");

            await queryRunner.commitTransaction();
            return salvo;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async atualizarAluno(id: number, dados: any) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(Aluno, id, dados);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async deletarAluno(id: number) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.delete(Aluno, id);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    // MÉTODOS DE CURSO
    async listarCursos() { return await CursoRepo.find(); }
    
    async buscarCursoPorId(id: number) { return await CursoRepo.findOneBy({ id }); }

    async criarCurso(dados: any) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const novoCurso = queryRunner.manager.create(Curso, dados);
            const salvo = await queryRunner.manager.save(novoCurso);

            // Gatilho de Rollback para teste
            if (dados.carga_horaria === 1000) throw new Error("Rollback: Carga horária excessiva.");

            await queryRunner.commitTransaction();
            return salvo;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async atualizarCurso(id: number, dados: any) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(Curso, id, dados);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async deletarCurso(id: number) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.delete(Curso, id);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    // MÉTODOS DE MATRÍCULA
    async listMatriculas() { 
        return await MatriculaRepo.find({ relations: ["aluno", "curso"] }); 
    }

    async createMatricula(alunoId: number, cursoId: number) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Verificações dentro do contexto da transação
            const aluno = await queryRunner.manager.findOneBy(Aluno, { id: alunoId });
            const curso = await queryRunner.manager.findOneBy(Curso, { id: cursoId });

            if (!aluno || !curso) throw new Error("Aluno ou Curso não encontrado.");

            const jaExiste = await queryRunner.manager.findOneBy(Matricula, { 
                aluno: { id: alunoId }, 
                curso: { id: cursoId } 
            });
            if (jaExiste) throw new Error("O aluno já está matriculado neste curso.");

            const matricula = queryRunner.manager.create(Matricula, { aluno, curso });
            const salva = await queryRunner.manager.save(matricula);

            // Gatilho de Rollback para teste
            if (alunoId === 777) throw new Error("Rollback: Falha crítica simulada.");

            await queryRunner.commitTransaction();
            return salva;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteMatricula(id: number) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.delete(Matricula, id);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async listByAluno(alunoId: number) {
        return await MatriculaRepo.find({ 
            where: { aluno: { id: alunoId } }, 
            relations: ["aluno", "curso"] 
        });
    }
}