const db = require("../db")

function listar(){
    return db.get("medicos")
}

function buscar(id){
    const medicos = db.get("medicos")
    return medicos.find(m => m.id == id)
}

function criar(dados){

    const medicos = db.get("medicos")

    const novoMedico = {
        id: Date.now(),
        ...dados
    }

    medicos.push(novoMedico)

    db.set("medicos", medicos)

    return novoMedico
}

function atualizar(id, dados){

    const medicos = db.get("medicos")

    const index = medicos.findIndex(m => m.id == id)

    medicos[index] = {
        id: Number(id),
        ...dados
    }

    db.set("medicos", medicos)

    return medicos[index]
}

function atualizarParcial(id, dados){

    const medicos = db.get("medicos")

    const index = medicos.findIndex(m => m.id == id)

    medicos[index] = {
        ...medicos[index],
        ...dados
    }

    db.set("medicos", medicos)

    return medicos[index]
}

function deletar(id){

    const medicos = db.get("medicos")

    const novaLista = medicos.filter(m => m.id != id)

    db.set("medicos", novaLista)
}

module.exports = {
    listar,
    criar,
    buscar,
    atualizar,
    atualizarParcial,
    deletar
}