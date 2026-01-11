const Joi = require('joi');


const alunoSchema = Joi.object({
    nome: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'O nome é obrigatório.',
        'string.min': 'O nome deve ter pelo menos 3 caracteres.',
        'any.required': 'O campo nome é obrigatório.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'O e-mail informado é inválido.',
        'any.required': 'O e-mail é obrigatório.'
    })
});

const cursoSchema = Joi.object({
    nome: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'O nome do curso é obrigatório.',
        'string.min': 'O nome do curso deve ter pelo menos 3 caracteres.',
        'any.required': 'O nome do curso é obrigatório.'
    }),
    cargaHoraria: Joi.number().integer().positive().required().messages({
        'number.base': 'A carga horária deve ser um número.',
        'number.integer': 'A carga horária deve ser um número inteiro.',
        'number.positive': 'A carga horária deve ser um valor positivo.',
        'any.required': 'A carga horária é obrigatória.'
    })
});

const matriculaSchema = Joi.object({
    alunoId: Joi.number().integer().positive().required().messages({
        'number.base': 'O ID do aluno deve ser um número.',
        'any.required': 'O ID do aluno é obrigatório.'
    }),
    cursoId: Joi.number().integer().positive().required().messages({
        'number.base': 'O ID do curso deve ser um número.',
        'any.required': 'O ID do curso é obrigatório.'
    })
});

const validateAluno = (req, res, next) => {
    const { error } = alunoSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            erro: "Erro de validação - ALUNO",
            detalhes: error.details.map(d => d.message)
        });
    }
    next();
};

const validateCurso = (req, res, next) => {
    const { error } = cursoSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            erro: "Erro de validação - CURSO",
            detalhes: error.details.map(d => d.message)
        });
    }
    next();
};

const validateMatricula = (req, res, next) => {
    const { error } = matriculaSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            erro: "Erro de validação - MATRÍCULA",
            detalhes: error.details.map(d => d.message)
        });
    }
    next();
};

module.exports = { 
    validateAluno, 
    validateCurso, 
    validateMatricula 
};