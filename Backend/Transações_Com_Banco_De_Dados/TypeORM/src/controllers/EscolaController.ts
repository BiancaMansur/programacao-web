import { Request, Response } from "express";
import { EscolaService } from "../services/EscolaService";

const service = new EscolaService();

export class EscolaController {
  // MÉTODOS DE ALUNO
  async getAllAlunos(req: Request, res: Response) {
    try {
      res.json(await service.listarAlunos());
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  async postAluno(req: Request, res: Response) {
    try {
      // O Service gerencia o início da transação e o Rollback se o nome for "Erro"
      const novo = await service.criarAluno(req.body);
      res.status(201).json(novo);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async getAluno(req: Request, res: Response) {
    try {
      const aluno = await service.buscarAlunoPorId(Number(req.params.id));
      if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
      res.json(aluno);
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  async putAluno(req: Request, res: Response) {
    try {
      await service.atualizarAluno(Number(req.params.id), req.body);
      res.json({
        message: "Aluno atualizado com sucesso (Transação concluída)",
      });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async deleteAluno(req: Request, res: Response) {
    try {
      await service.deletarAluno(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  // MÉTODOS DE CURSO
  async getAllCursos(req: Request, res: Response) {
    try {
      res.json(await service.listarCursos());
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  async postCurso(req: Request, res: Response) {
    try {
      // O Service executa Rollback se carga_horaria for 1000
      const novo = await service.criarCurso(req.body);
      res.status(201).json(novo);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async getCurso(req: Request, res: Response) {
    try {
      const curso = await service.buscarCursoPorId(Number(req.params.id));
      if (!curso) return res.status(404).json({ erro: "Curso não encontrado" });
      res.json(curso);
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  async putCurso(req: Request, res: Response) {
    try {
      await service.atualizarCurso(Number(req.params.id), req.body);
      res.json({ message: "Curso atualizado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async deleteCurso(req: Request, res: Response) {
    try {
      await service.deletarCurso(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  // MÉTODOS DE MATRÍCULA
  async getAllMatriculas(req: Request, res: Response) {
    try {
      res.json(await service.listMatriculas());
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  async postMatricula(req: Request, res: Response) {
    try {
      const { alunoId, cursoId } = req.body;
      const matricula = await service.createMatricula(alunoId, cursoId);
      res.status(201).json(matricula);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async deleteMatricula(req: Request, res: Response) {
    try {
      await service.deleteMatricula(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async getMatriculasPorAluno(req: Request, res: Response) {
    try {
      res.json(await service.listByAluno(Number(req.params.id_aluno)));
    } catch (error: any) {
      res.status(404).json({ erro: error.message });
    }
  }
}
