const express = require('express');
const pg = require('pg');

const PORT = 3000;

const app = express();

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});