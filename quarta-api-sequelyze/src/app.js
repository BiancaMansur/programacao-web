const express = require('express');
const router = require('./router');
require('./database/index'); 

const app = express();

app.use(express.json());
app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});