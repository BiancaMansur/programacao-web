const express = require("express");
const router = express.Router();
const db = require("../db/knex");
 
// 🔹 Enviar mensagem
router.post("/mensagens", async (req, res) => {
  try {
    const { match_id, usuario_id, texto } = req.body;
 
    const mensagem = await db("mensagens")
      .insert({
        match_id,
        usuario_id,
        texto
      })
      .returning("*");
 
    res.status(201).json(mensagem[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
// 🔹 Buscar mensagens de um match
router.get("/mensagens/:match_id", async (req, res) => {
  try {
    const mensagens = await db("mensagens")
      .where({ match_id: req.params.match_id })
      .orderBy("created_at", "asc");
 
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
module.exports = router;