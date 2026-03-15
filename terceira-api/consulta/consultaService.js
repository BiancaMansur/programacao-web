const consultaRepository = require("./consultaRepository")

async function criar(dados){

    const consultas = await consultaRepository.listar()

    const horarioOcupado = consultas.find(c =>
        c.medicoId == dados.medicoId &&
        c.data == dados.data
    )

    if(horarioOcupado){
        throw new Error("Horário do médico já está ocupado")
    }

    return consultaRepository.criar(dados)
}

async function listar(){
    return consultaRepository.listar()
}

async function buscar(id){
    return consultaRepository.buscar(id)
}

async function atualizar(id, dados){
    return consultaRepository.atualizar(id, dados)
}

async function atualizarParcial(id, dados){
    return consultaRepository.atualizarParcial(id, dados)
}

async function deletar(id){
    return consultaRepository.deletar(id)
}

module.exports = {
    criar,
    listar,
    buscar,
    atualizar,
    atualizarParcial,
    deletar
}