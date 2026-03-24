const express = require("express");
const router = express.Router();
const db = require("../db/knex");
 

router.post("/interacoes", async (req, res) => {
  try {
    const { usuario_origem_id, usuario_destino_id, tipo } = req.body;
 
    const interacao = await db("interacoes")
      .insert({
        usuario_origem_id,
        usuario_destino_id,
        tipo
      })
      .returning("*");
 
    res.status(201).json(interacao[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/interacoes", async (req, res) => {
  try {
    const dados = await db("interacoes").select("*");
    res.json(dados);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
module.exports = router;
 