const express = require("express");
const router = express.Router();
const db = require("../db/knex");
 

router.post("/interesses", async (req, res) => {
  try {
    const interesse = await db("interesses")
      .insert(req.body)
      .returning("*");
 
    res.status(201).json(interesse[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/interesses", async (req, res) => {
  try {
    const interesses = await db("interesses").select("*");
    res.json(interesses);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/interesses/:id", async (req, res) => {
  try {
    const interesse = await db("interesses")
      .where({ id: req.params.id })
      .first();
 
    if (!interesse) {
      return res.status(404).json({ mensagem: "Interesse não encontrado" });
    }
 
    res.json(interesse);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.put("/interesses/:id", async (req, res) => {
  try {
    const interesse = await db("interesses")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
 
    if (!interesse.length) {
      return res.status(404).json({ mensagem: "Interesse não encontrado" });
    }
 
    res.json(interesse[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.patch("/interesses/:id", async (req, res) => {
  try {
    const interesse = await db("interesses")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
 
    if (!interesse.length) {
      return res.status(404).json({ mensagem: "Interesse não encontrado" });
    }
 
    res.json(interesse[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.delete("/interesses/:id", async (req, res) => {
  try {
    const deletado = await db("interesses")
      .where({ id: req.params.id })
      .del();
 
    if (!deletado) {
      return res.status(404).json({ mensagem: "Interesse não encontrado" });
    }
 
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
module.exports = router;
 