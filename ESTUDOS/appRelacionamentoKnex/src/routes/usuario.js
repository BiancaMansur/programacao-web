const express = require("express");
const router = express.Router();
const db = require("../db/knex");
 
router.post("/usuarios", async (req, res) => {
  try {
    const usuario = await db("usuarios")
      .insert(req.body)
      .returning("*");
 
    res.status(201).json(usuario[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await db("usuarios").select("*");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await db("usuarios")
      .where({ id: req.params.id })
      .first();
 
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
 
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.put("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await db("usuarios")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
 
    if (!usuario.length) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
 
    res.json(usuario[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.patch("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await db("usuarios")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
 
    if (!usuario.length) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
 
    res.json(usuario[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.delete("/usuarios/:id", async (req, res) => {
  try {
    const deletado = await db("usuarios")
      .where({ id: req.params.id })
      .del();
 
    if (!deletado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
 
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
module.exports = router;