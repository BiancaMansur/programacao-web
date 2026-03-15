const pacienteRepository = require("./pacienteRepository")

async function listar(){
    return pacienteRepository.listar()
}

async function criar(dados){
    return pacienteRepository.criar(dados)
}

async function buscar(id){
    return pacienteRepository.buscar(id)
}

async function atualizar(id, dados){
    return pacienteRepository.atualizar(id, dados)
}

async function atualizarParcial(id, dados){
    return pacienteRepository.atualizarParcial(id, dados)
}

async function deletar(id){
    return pacienteRepository.deletar(id)
}

module.exports = {
    listar,
    criar,
    buscar,
    atualizar,
    atualizarParcial,
    deletar
}