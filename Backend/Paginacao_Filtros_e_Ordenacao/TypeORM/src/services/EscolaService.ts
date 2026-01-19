import { ILike } from "typeorm";
import { AlunoRepo, CursoRepo, MatriculaRepo } from "../repositories/EscolaRepository";

export class EscolaService {
    // MÉTODOS DE ALUNO

    // Lista alunos com paginação, filtro e ordenação
    async listarAlunos(query: any) {
        const { page = 1, limit = 10, filter, sort = 'id', order = 'ASC' } = query;
        const skip = (Number(page) - 1) * Number(limit);

        // Configura o filtro OR para nome ou email usando ILike
        const where = filter ? [
            { nome: ILike(`%${filter}%`) },
            { email: ILike(`%${filter}%`) }
        ] : {};

        // findAndCount retorna um array:
        const [dados, total] = await AlunoRepo.findAndCount({
            where,
            take: Number(limit), // Limite
            skip: Number(skip),  // Deslocamento
            order: { [sort]: order } // Ordenação dinâmica
        });

        return { dados, total };
    }

    async criarAluno(dados: any) { return await AlunoRepo.save(AlunoRepo.create(dados)); }
    async buscarAlunoPorId(id: number) { return await AlunoRepo.findOneBy({ id: id }); }
    async atualizarAluno(id: number, dados: any) { return await AlunoRepo.update(id, dados); }
    async deletarAluno(id: number) { return await AlunoRepo.delete(id); }

    // MÉTODOS DE CURSO

    // Lista cursos com paginação, filtro e ordenação
    async listarCursos(query: any) {
        const { page = 1, limit = 10, filter, sort = 'id', order = 'ASC' } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = filter ? { nome_curso: ILike(`%${filter}%`) } : {};

        const [dados, total] = await CursoRepo.findAndCount({
            where,
            take: Number(limit),
            skip: Number(skip),
            order: { [sort]: order }
        });

        return { dados, total };
    }

    async criarCurso(dados: any) { return await CursoRepo.save(CursoRepo.create(dados)); }
    async buscarCursoPorId(id: number) { return await CursoRepo.findOneBy({ id: id }); }
    async atualizarCurso(id: number, dados: any) { return await CursoRepo.update(id, dados); }
    async deletarCurso(id: number) { return await CursoRepo.delete(id); }

    // MÉTODOS DE MATRÍCULA

    // Lista matrículas com paginação e filtro por IDs
    async listMatriculas(query: any) { 
        const { page = 1, limit = 10, filter, sort = 'id', order = 'ASC' } = query;
        const skip = (Number(page) - 1) * Number(limit);

        let where: any = {};
        if (filter && !isNaN(Number(filter))) {
            where = [
                { aluno: { id: Number(filter) } },
                { curso: { id: Number(filter) } }
            ];
        }

        const [dados, total] = await MatriculaRepo.findAndCount({
            where,
            relations: ["aluno", "curso"],
            take: Number(limit),
            skip: Number(skip),
            order: { [sort]: order }
        });

        return { dados, total };
    }

    async createMatricula(alunoId: number, cursoId: number) {
        const matricula = MatriculaRepo.create({ 
            aluno: { id: alunoId }, 
            curso: { id: cursoId } 
        });
        return await MatriculaRepo.save(matricula);
    }
    async deleteMatricula(id: number) { 
        return await MatriculaRepo.delete(id); 
    }
    async listByAluno(alunoId: number) {
        return await MatriculaRepo.find({ 
            where: { aluno: { id: alunoId } }, 
            relations: ["aluno", "curso"] 
        });
    }
}