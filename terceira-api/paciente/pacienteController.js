const pacienteService = require('./pacienteService')

async function ListarPacientes(request, response){
    const pacientes = await pacienteService.listar()
    response.status(200).json(pacientes)
}

async function CriarPaciente(request, response){
    const paciente = await pacienteService.criar(request.body)
    response.status(201).json(paciente)
}

async function BuscarPaciente(request, response){
    const paciente = await pacienteService.buscar(request.params.id)
    response.status(200).json(paciente)
}

async function AtualizarPaciente(request, response){
    const paciente = await pacienteService.atualizar(request.params.id, request.body)
    response.status(200).json(paciente)
}

async function AtualizarParcialPaciente(request, response){
    const paciente = await pacienteService.atualizarParcial(request.params.id, request.body)
    response.status(200).json(paciente)
}

async function DeletarPaciente(request, response){
    await pacienteService.deletar(request.params.id)
    response.status(204).send()
}

module.exports = {
    ListarPacientes,
    CriarPaciente,
    BuscarPaciente,
    AtualizarPaciente,
    AtualizarParcialPaciente,
    DeletarPaciente
}