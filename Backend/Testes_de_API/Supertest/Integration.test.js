const request = require('supertest');
const app = require('./src/app');

describe('Teste de Integração Completo (API Flow)', () => {

    // Variáveis para armazenar IDs criados dinamicamente
    let alunoId;
    let cursoId;
    let matriculaId;

    // =================================================================
    // 1. TESTES DE ALUNOS
    // =================================================================
    describe('Endpoints de Alunos', () => {
        
        it('POST /alunos - Deve criar um aluno com sucesso (201)', async () => {
            const res = await request(app)
                .post('/api/alunos')
                .send({ nome: "Aluno Teste", email: "teste@escola.com" });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.nome).toBe("Aluno Teste");
            alunoId = res.body.id; // Salva para usar depois
        });

        it('POST /alunos - Deve falhar ao criar sem nome (400)', async () => {
            const res = await request(app)
                .post('/api/alunos')
                .send({ email: "semnome@escola.com" }); // Falta o nome

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error'); // O controller retorna json({ error: ... })
        });

        it('GET /alunos/:id - Deve retornar o aluno criado (200)', async () => {
            const res = await request(app).get(`/api/alunos/${alunoId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.id).toEqual(alunoId);
        });

        it('GET /alunos/:id - Deve retornar 404 para aluno inexistente', async () => {
            const res = await request(app).get('/api/alunos/99999');
            expect(res.statusCode).toEqual(404);
        });
    });

    // =================================================================
    // 2. TESTES DE CURSOS
    // =================================================================
    describe('Endpoints de Cursos', () => {

        it('POST /cursos - Deve criar um curso com sucesso (201)', async () => {
            const res = await request(app)
                .post('/api/cursos')
                .send({ nome: "Curso Jest", cargaHoraria: 40 });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            cursoId = res.body.id;
        });

        it('POST /cursos - Deve falhar se faltar carga horária (400)', async () => {
            const res = await request(app)
                .post('/api/cursos')
                .send({ nome: "Curso Incompleto" });

            expect(res.statusCode).toEqual(400);
        });

        it('PUT /cursos/:id - Deve atualizar um curso (200)', async () => {
            const res = await request(app)
                .put(`/api/cursos/${cursoId}`)
                .send({ nome: "Curso Jest Avançado", cargaHoraria: 50 });

            expect(res.statusCode).toEqual(200);
            expect(res.body.nome).toBe("Curso Jest Avançado");
        });

        it('DELETE /cursos/:id - Deve retornar 404 ao tentar deletar curso inexistente', async () => {
            const res = await request(app).delete('/api/cursos/99999');
            expect(res.statusCode).toEqual(404);
        });
    });

    // =================================================================
    // 3. TESTES DE MATRÍCULAS (O Fluxo Principal)
    // =================================================================
    describe('Endpoints de Matrículas', () => {

        it('POST /matriculas - Deve matricular aluno no curso (201)', async () => {
            const res = await request(app)
                .post('/api/matriculas')
                .send({ alunoId: alunoId, cursoId: cursoId });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            matriculaId = res.body.id;
        });

        it('POST /matriculas - Deve falhar duplicação de matrícula (400)', async () => {
            // Tenta mandar a mesma coisa de novo
            const res = await request(app)
                .post('/api/matriculas')
                .send({ alunoId: alunoId, cursoId: cursoId });

            expect(res.statusCode).toEqual(400);
            expect(res.body.erro).toMatch(/já está matriculado/i);
        });

        it('POST /matriculas - Deve falhar com aluno inexistente (400)', async () => {
            const res = await request(app)
                .post('/api/matriculas')
                .send({ alunoId: 9999, cursoId: cursoId });

            expect(res.statusCode).toEqual(400);
            expect(res.body.erro).toMatch(/Aluno inexistente/i);
        });

        it('DELETE /matriculas/:id - Deve cancelar matrícula (204)', async () => {
            const res = await request(app).delete(`/api/matriculas/${matriculaId}`);
            expect(res.statusCode).toEqual(204);
        });

        it('DELETE /matriculas/:id - Deve retornar 404 ao tentar cancelar matrícula inexistente', async () => {
            // O Service lança erro "Matrícula não encontrada", o controller pega e devolve 404
            const res = await request(app).delete(`/api/matriculas/${matriculaId}`); 
            // Como acabamos de deletar acima, agora ela não existe mais
            expect(res.statusCode).toEqual(404);
        });
    });
});