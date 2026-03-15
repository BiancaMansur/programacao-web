const medicoService = require('./medicoService')

async function ListarMedicos(request, response){
    const medicos = await medicoService.listar()
    response.status(200).json(medicos)
}

async function CriarMedico(request, response){
    const medico = await medicoService.criar(request.body)
    response.status(201).json(medico)
}

async function BuscarMedico(request, response){
    const medico = await medicoService.buscar(request.params.id)
    response.status(200).json(medico)
}

async function AtualizarMedico(request, response){
    const medico = await medicoService.atualizar(request.params.id, request.body)
    response.status(200).json(medico)
}

async function AtualizarParcialMedico(request, response){
    const medico = await medicoService.atualizarParcial(request.params.id, request.body)
    response.status(200).json(medico)
}

async function DeletarMedico(request, response){
    await medicoService.deletar(request.params.id)
    response.status(204).send()
}

module.exports = {
    ListarMedicos,
    CriarMedico,
    BuscarMedico,
    AtualizarMedico,
    AtualizarParcialMedico,
    DeletarMedico
}