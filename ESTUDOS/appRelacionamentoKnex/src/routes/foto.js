const express = require("express");
const router = express.Router();
const db = require("../db/knex");
 

router.post("/fotos", async (req, res) => {
  try {
    const foto = await db("fotos")
      .insert(req.body)
      .returning("*");
 
    res.status(201).json(foto[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/fotos", async (req, res) => {
  try {
    const fotos = await db("fotos").select("*");
    res.json(fotos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.get("/fotos/:id", async (req, res) => {
  try {
    const foto = await db("fotos")
      .where({ id: req.params.id })
      .first();
 
    if (!foto) {
      return res.status(404).json({ mensagem: "Foto não encontrada" });
    }
 
    res.json(foto);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.put("/fotos/:id", async (req, res) => {
  try {
    const foto = await db("fotos")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
 
    if (!foto.length) {
      return res.status(404).json({ mensagem: "Foto não encontrada" });
    }
 
    res.json(foto[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.patch("/fotos/:id", async (req, res) => {
  try {
    const foto = await db("fotos")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
 
    if (!foto.length) {
      return res.status(404).json({ mensagem: "Foto não encontrada" });
    }
 
    res.json(foto[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 

router.delete("/fotos/:id", async (req, res) => {
  try {
    const deletado = await db("fotos")
      .where({ id: req.params.id })
      .del();
 
    if (!deletado) {
      return res.status(404).json({ mensagem: "Foto não encontrada" });
    }
 
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
 
module.exports = router;
 