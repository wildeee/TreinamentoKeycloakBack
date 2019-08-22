const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Essa é a rota pública');
});

app.get('/logged', function(req, res) {
  res.send('Essa rota só poderá ser acessada por usuários logados');
});

app.get('/role-access', function(req, res) {
  res.send('Essa rota só poderá ser acessada por usuários que tenham a role ticaracatica');
});

const port = process.env.PORT || 8081;
app.listen(port, function() {
  console.log(`Back-end rodando na URL http://localhost:${port}`);
});
