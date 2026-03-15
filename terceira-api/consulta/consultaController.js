const consultaService = require('./consultaService')

async function ListarConsultas(request, response){
    const consultas = await consultaService.listar()
    response.status(200).json(consultas)
}

async function CriarConsulta(request, response){
    const consulta = await consultaService.criar(request.body)
    response.status(201).json(consulta)
}

async function BuscarConsulta(request, response){
    const consulta = await consultaService.buscar(request.params.id)
    response.status(200).json(consulta)
}

async function AtualizarConsulta(request, response){
    const consulta = await consultaService.atualizar(request.params.id, request.body)
    response.status(200).json(consulta)
}

async function AtualizarParcialConsulta(request, response){
    const consulta = await consultaService.atualizarParcial(request.params.id, request.body)
    response.status(200).json(consulta)
}

async function DeletarConsulta(request, response){
    await consultaService.deletar(request.params.id)
    response.status(204).send()
}

module.exports = {
    ListarConsultas,
    CriarConsulta,
    BuscarConsulta,
    AtualizarConsulta,
    AtualizarParcialConsulta,
    DeletarConsulta
}