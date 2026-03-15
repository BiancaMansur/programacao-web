const express = require('express')
const rotas = express.Router()

const controller = require('./consultaController')

rotas.get('/consultas', controller.ListarConsultas)
rotas.get('/consulta/:id', controller.BuscarConsulta)
rotas.post('/consulta', controller.CriarConsulta)
rotas.put('/consulta/:id', controller.AtualizarConsulta)
rotas.patch('/consulta/:id', controller.AtualizarParcialConsulta)
rotas.delete('/consulta/:id', controller.DeletarConsulta)

module.exports = rotas