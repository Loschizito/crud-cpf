const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ static: path.join(__dirname, 'public') });
const porta = process.env.PORT || 3000;

app.use(middlewares);
app.use(jsonServer.bodyParser);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(router);

app.listen(porta, () => {
    console.log(`Servidor rodando: http://localhost:${porta}`);
});
