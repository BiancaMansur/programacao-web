const db = require("../db")

function listar(){
    return db.get("consultas")
}

function buscar(id){
    return db.get("consultas").find(c => c.id == id)
}

function salvar(consulta){
    const consultas = db.get("consultas")
    consultas.push(consulta)
    db.set("consultas", consultas)
}

function atualizar(id,dados){
    const consultas = db.get("consultas")
    const index = consultas.findIndex(c => c.id == id)

    if(index !== -1){
        consultas[index] = {id:Number(id), ...dados}
        db.set("consultas",consultas)
    }
}

function patch(id,dados){
    const consultas = db.get("consultas")
    const index = consultas.findIndex(c => c.id == id)

    if(index !== -1){
        consultas[index] = {...consultas[index], ...dados}
        db.set("consultas",consultas)
    }
}

function deletar(id){
    let consultas = db.get("consultas")
    consultas = consultas.filter(c => c.id != id)
    db.set("consultas",consultas)
}

module.exports = {
listar,
buscar,
salvar,
atualizar,
patch,
deletar
}