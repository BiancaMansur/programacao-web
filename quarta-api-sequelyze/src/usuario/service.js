const repository = require('./repository');

class UsuarioService {
  async listarTodos() {
    return await repository.findAll();
  }

  async criar(dados) {
    return await repository.insert(dados);
  }
}

module.exports = new UsuarioService();