const CursoService = require('../../src/services/CursoService');
const CursoRepository = require('../../src/repositories/CursoRepository');

// 1. Dizemos ao Jest para "fingir" que o Repository existe.
// Assim, não usamos o banco de dados real.
jest.mock('../../src/repositories/CursoRepository');

describe('Testes Unitários: CursoService (Com Mocks)', () => {

    // Limpa as simulações antes de cada teste para evitar interferências
    afterEach(() => {
        jest.clearAllMocks();
    });

    // TESTES DE CRIAÇÃO
    it('Deve criar um curso com sucesso', () => {
        const dadosEntrada = { nome: "Node.js", cargaHoraria: 10 };
        // Simulamos que o repositório devolve o curso criado
        CursoRepository.create.mockReturnValue({ id: 123, ...dadosEntrada });

        const resultado = CursoService.criarCurso(dadosEntrada);

        expect(resultado).toHaveProperty('id');
        expect(resultado.nome).toBe("Node.js");
        expect(CursoRepository.create).toHaveBeenCalledTimes(1);
    });

    it('Deve falhar ao tentar criar sem Nome', () => {
        const dadosInvalidos = { cargaHoraria: 10 };
        
        expect(() => {
            CursoService.criarCurso(dadosInvalidos);
        }).toThrow("Nome do curso é obrigatório");
        
        // Garante que o repo NÃO foi chamado, pois parou na validação
        expect(CursoRepository.create).not.toHaveBeenCalled();
    });

    it('Deve falhar ao tentar criar sem Carga Horária', () => {
        const dadosInvalidos = { nome: "Curso X" };
        
        expect(() => {
            CursoService.criarCurso(dadosInvalidos);
        }).toThrow("Carga horária é obrigatória");
    });

    // TESTES DE LEITURA
    it('Deve listar todos os cursos', () => {
        // Simulamos o retorno do banco
        const listaFalsa = [{ id: 1, nome: "Java" }, { id: 2, nome: "Go" }];
        CursoRepository.findAll.mockReturnValue(listaFalsa);

        const resultado = CursoService.listarTodos();

        expect(resultado).toHaveLength(2);
        expect(resultado[0].nome).toBe("Java");
        expect(CursoRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('Deve buscar curso por ID', () => {
        const cursoFalso = { id: 10, nome: "Python" };
        CursoRepository.findById.mockReturnValue(cursoFalso);

        const resultado = CursoService.buscarPorId(10);

        expect(resultado).toEqual(cursoFalso);
        expect(CursoRepository.findById).toHaveBeenCalledWith(10);
    });

    // TESTES DE ATUALIZAÇÃO
    it('Deve atualizar um curso com sucesso', () => {
        const id = 1;
        const dadosAtualizacao = { nome: "Nome Novo" };
        
        // Precisamos simular que o curso EXISTE primeiro
        CursoRepository.findById.mockReturnValue({ id: 1, nome: "Antigo" });
        // Depois simulamos o update
        CursoRepository.update.mockReturnValue({ id: 1, nome: "Nome Novo" });

        const resultado = CursoService.atualizarCurso(id, dadosAtualizacao);

        expect(resultado.nome).toBe("Nome Novo");
        expect(CursoRepository.update).toHaveBeenCalledWith(id, dadosAtualizacao);
    });

    it('Deve falhar ao tentar atualizar curso inexistente', () => {
        // Simulamos que o findById retornou NULL
        CursoRepository.findById.mockReturnValue(null);

        expect(() => {
            CursoService.atualizarCurso(999, { nome: "X" });
        }).toThrow("Curso não encontrado para atualização.");

        // Garante que o update NUNCA foi chamado
        expect(CursoRepository.update).not.toHaveBeenCalled();
    });

    // TESTES DE REMOÇÃO
    it('Deve remover um curso com sucesso', () => {
        // Simulamos que o delete retornou o objeto excluído
        CursoRepository.delete.mockReturnValue({ id: 1, nome: "Deletado" });

        const resultado = CursoService.removerCurso(1);

        expect(resultado).toBeTruthy();
        expect(CursoRepository.delete).toHaveBeenCalledWith(1);
    });

    it('Deve falhar ao tentar remover curso inexistente', () => {
        // Simulamos que o delete retornou null
        CursoRepository.delete.mockReturnValue(null);

        expect(() => {
            CursoService.removerCurso(999);
        }).toThrow("Curso inexistente.");
    });
});