const medicoService = require('./medicoService')

async function listar(){
    return medicoRepository.listar()
}

async function criar(dados){
    return medicoRepository.criar(dados)
}

async function buscar(id){
    return medicoRepository.buscar(id)
}

async function atualizar(id, dados){
    return medicoRepository.atualizar(id, dados)
}

async function atualizarParcial(id, dados){
    return medicoRepository.atualizarParcial(id, dados)
}

async function deletar(id){
    return medicoRepository.deletar(id)
}

module.exports = {
    listar,
    criar,
    buscar,
    atualizar,
    atualizarParcial,
    deletar
}