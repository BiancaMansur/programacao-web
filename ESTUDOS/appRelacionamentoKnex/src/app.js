const express = require("express");
const usuarioRoutes = require("./routes/usuario");
const enderecoRoutes = require("./routes/endereco");
const fotoRoutes = require("./routes/foto");
const interesseRoutes = require("./routes/interesse");
const usuarioInteresseRoutes = require("./routes/usuarioInteresse");
const interacaoRoutes = require("./routes/interacao");
const matchRoutes = require("./routes/match");
const mensagemRoutes = require("./routes/mensagem");

const app = express();

app.use(express.json());
app.use(usuarioRoutes);
app.use(enderecoRoutes);
app.use(fotoRoutes);
app.use(interesseRoutes);
app.use(usuarioInteresseRoutes);
app.use(interacaoRoutes);
app.use(matchRoutes);
app.use(mensagemRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const db = require("./db/knex");

db.raw("SELECT 1")
  .then(() => console.log("Banco conectado"))
  .catch(err => console.error(err));