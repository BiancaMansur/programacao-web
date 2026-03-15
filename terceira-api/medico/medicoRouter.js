const express = require('express')
const rotas = express.Router()

const controller = require('./medicoController')

rotas.get('/medicos', controller.ListarMedicos)
rotas.get('/medico/:id', controller.BuscarMedico)
rotas.post('/medico', controller.CriarMedico)
rotas.put('/medico/:id', controller.AtualizarMedico)
rotas.patch('/medico/:id', controller.AtualizarParcialMedico)
rotas.delete('/medico/:id', controller.DeletarMedico)

module.exports = rotas