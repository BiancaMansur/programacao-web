const express = require("express");
const router = express.Router();
const db = require("../db/knex");
 

router.post("/interacoes", async (req, res) => {
  const trx = await db.transaction();
 
  try {
    const { usuario_origem_id, usuario_destino_id, tipo } = req.body;
 

    await trx("interacoes").insert({
      usuario_origem_id,
      usuario_destino_id,
      tipo
    });
 
    let matchCriado = null;
 

    if (tipo === "like") {
      const jaCurtiu = await trx("interacoes")
        .where({
          usuario_origem_id: usuario_destino_id,
          usuario_destino_id: usuario_origem_id,
          tipo: "like"
        })
        .first();
 

      if (jaCurtiu) {
        const match = await trx("matches")
          .insert({
            usuario1_id: usuario_origem_id,
            usuario2_id: usuario_destino_id
          })
          .returning("*");
 
        matchCriado = match[0];
      }
    }
 
    await trx.commit();
 
    res.status(201).json({
      mensagem: "Interação registrada",
      match: matchCriado
    });
 
  } catch (error) {
    await trx.rollback();
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/matches", async (req, res) => {
  try {
    const matches = await db("matches").select("*");
    res.json(matches);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
module.exports = router;