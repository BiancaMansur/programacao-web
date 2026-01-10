const express = require('express');
const router = express.Router();

const Aluno = require('../controllers/AlunoController');
const Curso = require('../controllers/CursoController');
const Mat = require('../controllers/MatriculaController');
const authMiddleware = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const AuthController = require('../controllers/AuthController');

// Rotas de Autenticação (Abertas)
router.post('/registrar', AuthController.registrar);
router.post('/login', AuthController.login);

// --- ALUNO ---
router.get('/alunos', (req, res) => Aluno.getAll(req, res));
router.get('/alunos/:id', (req, res) => Aluno.getById(req, res));
router.post('/alunos', authMiddleware, role(['admin']), (req, res) => Aluno.create(req, res));
router.put('/alunos/:id', (req, res) => Aluno.update(req, res));
router.delete('/alunos/:id', (req, res) => Aluno.delete(req, res));

// --- CURSO ---
router.get('/cursos', (req, res) => Curso.getAll(req, res));
router.get('/cursos/:id', (req, res) => Curso.getById(req, res));
router.post('/cursos', authMiddleware, role(['admin']), (req, res) => Curso.create(req, res));
router.put('/cursos/:id', (req, res) => Curso.update(req, res));
router.delete('/cursos/:id', (req, res) => Curso.delete(req, res));

// --- MATRÍCULA ---
router.get('/matriculas', (req, res) => Mat.getAll(req, res));
router.delete('/matriculas/:id', authMiddleware, (req, res) => Mat.delete(req, res));
router.get('/listar-matriculas/:id_aluno', (req, res) => Mat.getByAluno(req, res));
router.post('/matricular', authMiddleware, role(['aluno']), (req, res) => Mat.create(req, res));

module.exports = router;