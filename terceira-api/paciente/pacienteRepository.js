const db = require("../db")

function listar(){
    return db.get("pacientes")
}

function buscar(id){
    const pacientes = db.get("pacientes")
    return pacientes.find(m => m.id == id)
}

function criar(dados){

    const pacientes = db.get("pacientes")

    const novoPaciente = {
        id: Date.now(),
        ...dados
    }

    pacientes.push(novoPaciente)

    db.set("pacientes", pacientes)

    return novoPaciente
}

function atualizar(id, dados){

    const pacientes = db.get("pacientes")

    const index = pacientes.findIndex(m => m.id == id)

    pacientes[index] = {
        id: Number(id),
        ...dados
    }

    db.set("pacientes", pacientes)

    return pacientes[index]
}

function atualizarParcial(id, dados){

    const pacientes = db.get("pacientes")

    const index = pacientes.findIndex(m => m.id == id)

    pacientes[index] = {
        ...pacientes[index],
        ...dados
    }

    db.set("pacientes", pacientes)

    return pacientes[index]
}

function deletar(id){

    const pacientes = db.get("pacientes")

    const novaLista = pacientes.filter(m => m.id != id)

    db.set("pacientes", novaLista)
}

module.exports = {
    listar,
    criar,
    buscar,
    atualizar,
    atualizarParcial,
    deletar
}