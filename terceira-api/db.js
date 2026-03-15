const banco = {
    medicos: [],
    pacientes: [],
    consultas: []
}

function get(colecao){
    return banco[colecao]
}

function set(colecao, dados){
    banco[colecao] = dados
}

module.exports = {
    get,
    set
}