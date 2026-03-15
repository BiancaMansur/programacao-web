const express = require('express')
const rotas = express.Router()

const controller = require('./pacienteController')

rotas.get('/pacientes', controller.ListarPacientes)
rotas.get('/paciente/:id', controller.BuscarPaciente)
rotas.post('/paciente', controller.CriarPaciente)
rotas.put('/paciente/:id', controller.AtualizarPaciente)
rotas.patch('/paciente/:id', controller.AtualizarParcialPaciente)
rotas.delete('/paciente/:id', controller.DeletarPaciente)

module.exports = rotas