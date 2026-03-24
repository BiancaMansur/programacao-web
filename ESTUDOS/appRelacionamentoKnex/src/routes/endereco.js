const express = require("express");
const router = express.Router();
const db = require("../db/knex");
 

router.post("/enderecos", async (req, res) => {
  try {
    const endereco = await db("enderecos")
      .insert(req.body)
      .returning("*");
 
    res.status(201).json(endereco[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/enderecos", async (req, res) => {
  try {
    const enderecos = await db("enderecos").select("*");
    res.json(enderecos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/enderecos/:id", async (req, res) => {
  try {
    const endereco = await db("enderecos")
      .where({ id: req.params.id })
      .first();
 
    if (!endereco) {
      return res.status(404).json({ mensagem: "Endereço não encontrado" });
    }
 
    res.json(endereco);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.put("/enderecos/:id", async (req, res) => {
  try {
    const endereco = await db("enderecos")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
 
    if (!endereco.length) {
      return res.status(404).json({ mensagem: "Endereço não encontrado" });
    }
 
    res.json(endereco[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.patch("/enderecos/:id", async (req, res) => {
  try {
    const endereco = await db("enderecos")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
 
    if (!endereco.length) {
      return res.status(404).json({ mensagem: "Endereço não encontrado" });
    }
 
    res.json(endereco[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.delete("/enderecos/:id", async (req, res) => {
  try {
    const deletado = await db("enderecos")
      .where({ id: req.params.id })
      .del();
 
    if (!deletado) {
      return res.status(404).json({ mensagem: "Endereço não encontrado" });
    }
 
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
module.exports = router;