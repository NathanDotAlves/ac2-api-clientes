const express = require('express');
const clienteRouter = require('./routes/clienteRouter');

const app = express();
app.use(express.json());

app.use('/clientes', clienteRouter);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});