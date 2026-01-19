const MatriculaService = require('./src/services/MatriculaService');
const AlunoRepository = require('./src/repositories/AlunoRepository');
const CursoRepository = require('./src/repositories/CursoRepository');
const MatriculaRepository = require('./src/repositories/MatriculaRepository');

jest.mock('./src/repositories/AlunoRepository');
jest.mock('./src/repositories/CursoRepository');
jest.mock('./src/repositories/MatriculaRepository');

describe('Testes Unitários: MatriculaService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve realizar a matrícula com sucesso', () => {
        // 1. Simulamos que o aluno existe (findById retorna um objeto)
        AlunoRepository.findById.mockReturnValue({ id: 1, nome: "João" });
        // 2. Simulamos que o curso existe
        CursoRepository.findById.mockReturnValue({ id: 10, nome: "Node.js" });
        // 3. Simulamos que NÃO existe matrícula prévia (findAll retorna array vazio)
        MatriculaRepository.findAll.mockReturnValue([]);
        // 4. Simulamos o retorno da criação
        MatriculaRepository.create.mockReturnValue({ 
            id: 500, alunoId: 1, cursoId: 10 
        });

        const resultado = MatriculaService.matricular(1, 10);

        expect(resultado).toHaveProperty('id', 500);
        expect(MatriculaRepository.create).toHaveBeenCalledWith(1, 10);
    });

    it('Deve lançar erro se o Aluno não existir', () => {
        // Simulamos que o aluno NÃO existe
        AlunoRepository.findById.mockReturnValue(null);

        expect(() => {
            MatriculaService.matricular(999, 10);
        }).toThrow("Aluno inexistente.");
        
        expect(MatriculaRepository.create).not.toHaveBeenCalled();
    });

    it('Deve lançar erro se o Curso não existir', () => {
        // Aluno existe
        AlunoRepository.findById.mockReturnValue({ id: 1 });
        // mas Curso NÃO existe
        CursoRepository.findById.mockReturnValue(null);

        expect(() => {
            MatriculaService.matricular(1, 999);
        }).toThrow("Curso inexistente.");
    });

    it('Deve lançar erro se o aluno JÁ estiver matriculado no curso', () => {
        AlunoRepository.findById.mockReturnValue({ id: 1 });
        CursoRepository.findById.mockReturnValue({ id: 10 });

        // O findAll retorna uma lista que JÁ CONTÉM esse aluno nesse curso
        MatriculaRepository.findAll.mockReturnValue([
            { id: 200, alunoId: 1, cursoId: 10 }
        ]);

        expect(() => {
            MatriculaService.matricular(1, 10);
        }).toThrow("O aluno já está matriculado neste curso.");
        
        // Garante que não duplicou
        expect(MatriculaRepository.create).not.toHaveBeenCalled();
    });
});