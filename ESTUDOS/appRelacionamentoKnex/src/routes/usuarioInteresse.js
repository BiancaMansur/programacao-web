const express = require("express");
const router = express.Router();
const db = require("../db/knex");
 

router.post("/usuario-interesses", async (req, res) => {
  try {
    const { usuario_id, interesse_id } = req.body;
 
    const relacao = await db("usuario_interesses")
      .insert({ usuario_id, interesse_id })
      .returning("*");
 
    res.status(201).json(relacao[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/usuario-interesses", async (req, res) => {
  try {
    const dados = await db("usuario_interesses").select("*");
    res.json(dados);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/usuarios/:id/interesses", async (req, res) => {
  try {
    const interesses = await db("usuario_interesses")
      .join("interesses", "usuario_interesses.interesse_id", "interesses.id")
      .where("usuario_interesses.usuario_id", req.params.id)
      .select("interesses.id", "interesses.nome");
 
    res.json(interesses);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.delete("/usuario-interesses", async (req, res) => {
  try {
    const { usuario_id, interesse_id } = req.body;
 
    const deletado = await db("usuario_interesses")
      .where({ usuario_id, interesse_id })
      .del();
 
    if (!deletado) {
      return res.status(404).json({ mensagem: "Relação não encontrada" });
    }
 
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
module.exports = router;