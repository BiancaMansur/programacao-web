const express = require('express'); 

const app = express();

app.use(express.json());

//Add variáveis

let alunos = [];
let cursos = [];

let idAluno = 1;
let idCurso = 1;

// POST, GET, PUT, PATCH, DELET do curso

app.post('/alunos', (request, response) => {

    const novoAluno = {
        id: idAluno++,
        nome: request.body.nome,
        matricula: request.body.matricula,
        cursos: request.body.cursos
    };

    alunos.push(novoAluno);

    response.status(201).json(novoAluno);
});

app.get('/alunos', (request, response) => {
    response.json(alunos);
});

app.get('/alunos/:id', (request, response) => {

    const id = parseInt(request.params.id);

    const aluno = alunos.find(a => a.id === id);

    if (!aluno) {
        return response.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    response.json(aluno);
});

app.put('/alunos/:id', (request, response) => {

    const id = parseInt(request.params.id);

    const aluno = alunos.find(a => a.id === id);

    if (!aluno) {
        return response.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    aluno.nome = request.body.nome;
    aluno.matricula = request.body.matricula;
    aluno.cursos = request.body.cursos;

    response.json(aluno);
});

app.patch('/alunos/:id', (request, response) => {

    const id = parseInt(request.params.id);

    const aluno = alunos.find(a => a.id === id);

    if (!aluno) {
        return response.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    if (request.body.nome) aluno.nome = request.body.nome;
    if (request.body.matricula) aluno.matricula = request.body.matricula;
    if (request.body.cursos) aluno.cursos = request.body.cursos;

    response.json(aluno);
});

app.delete('/alunos/:id', (request, response) => {

    const id = parseInt(request.params.id);

    alunos = alunos.filter(a => a.id !== id);

    response.json({ mensagem: "Aluno removido com sucesso" });
});

// POST, GET, PUT, PATCH, DELET do curso

app.post('/cursos', (request, response) => {

    const novoCurso = {
        id: idCurso++,
        nome: request.body.nome,
        descricao: request.body.descricao
    };

    cursos.push(novoCurso);

    response.status(201).json(novoCurso);
});

app.get('/cursos', (request, response) => {
    response.json(cursos);
});

app.get('/cursos/:id', (request, response) => {

    const id = parseInt(request.params.id);

    const curso = cursos.find(a => a.id === id);

    if (!curso) {
        return response.status(404).json({ mensagem: "Curso não encontrado" });
    }

    response.json(curso);
});

app.put('/cursos/:id', (request, response) => {

    const id = parseInt(request.params.id);

    const curso = cursos.find(a => a.id === id);

    if (!curso) {
        return response.status(404).json({ mensagem: "Curso não encontrado" });
    }

    curso.nome = request.body.nome;
    curso.descricao = request.body.descricao;

    response.json(curso);
});

app.patch('/cursos/:id', (request, response) => {

    const id = parseInt(request.params.id);

    const curso = cursos.find(a => a.id === id);

    if (!curso) {
        return response.status(404).json({ mensagem: "Curso não encontrado" });
    }

    if (request.body.nome) curso.nome = request.body.nome;
    if (request.body.descricao) curso.descricao = request.body.descricao;


    response.json(curso);
});

app.delete('/cursos/:id', (request, response) => {

    const id = parseInt(request.params.id);

    cursos = cursos.filter(a => a.id !== id);

    response.json({ mensagem: "Curso removido com sucesso" });
});

//Para iniciar o servidor

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});