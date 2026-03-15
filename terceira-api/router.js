const express = require("express")

const rotas = express.Router()

const medicoRouter = require("./medico/medicoRouter")
const pacienteRouter = require("./paciente/pacienteRouter")
const consultaRouter = require("./consulta/consultaRouter")

rotas.use(medicoRouter)
rotas.use(pacienteRouter)
rotas.use(consultaRouter)

module.exports = rotas