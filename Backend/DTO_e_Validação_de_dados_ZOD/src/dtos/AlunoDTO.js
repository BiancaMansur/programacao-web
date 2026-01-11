class AlunoDTO {
    constructor(dados) {
        this.nome = dados.nome;
        this.email = dados.email;
        // O ID não é incluído aqui pois é gerado pelo Repository
    }

    /**
     * Método estático para garantir que apenas os campos 
     * definidos no DTO sejam passados adiante.
     */
    static transformar(dados) {
        return new AlunoDTO(dados);
    }
}

module.exports = AlunoDTO;