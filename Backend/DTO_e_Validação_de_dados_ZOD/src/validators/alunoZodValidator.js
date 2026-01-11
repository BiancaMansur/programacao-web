const { z } = require('zod');

const alunoZodSchema = z.object({
    nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Formato de e-mail inválido")
});
const cursoSchema = z.object({
    nome: z.string().min(3, "O nome do curso deve ter no mínimo 3 caracteres"),
    cargaHoraria: z.number().int().positive("A carga horária deve ser um número inteiro positivo")
});
const matriculaSchema = z.object({
    alunoId: z.number().int().positive("ID do aluno inválido"),
    cursoId: z.number().int().positive("ID do curso inválido")
});
const formatZodError = (res, error, entidade) => {
    const issues = error.issues || error.errors || [];

    const detalhes = issues.length > 0 
        ? issues.map(err => ({ 
            campo: err.path.join('.'),
            mensagem: err.message
          })) 
        : [{ campo: "desconhecido", mensagem: error.message }];
    return res.status(422).json({
        erro: `Entidade Não Processável - ${entidade}`,
        detalhes: detalhes
    });
};

const validateAluno = (req, res, next) => {
    try {
        alunoZodSchema.parse(req.body);
        next();
    } catch (error) {
        return formatZodError(res, error, "ALUNO");
    }
};
const validateCurso = (req, res, next) => {
    try {
        cursoSchema.parse(req.body);
        next();
    } catch (error) {
        return formatZodError(res, error, "CURSO");
    }
};
const validateMatricula = (req, res, next) => {
    try {
        matriculaSchema.parse(req.body);
        next();
    } catch (error) {
        return formatZodError(res, error, "MATRÍCULA");
    }
};

module.exports = { 
    validateAluno, 
    validateCurso, 
    validateMatricula 
};