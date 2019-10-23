const express = require('express');
const app = express();

const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

app.get('/', keycloak.checkSso(), function(req, res) {
  if (req.kauth.grant) {
    res.send(`Essa é a rota pública. Você é sempre bem vindo aqui ${req.kauth.grant.access_token.content.name}.`);
    return;
  }
  res.send('Essa é a rota pública, e você não está logado.');
});

app.get('/logged', keycloak.protect(), function(req, res) {
  res.send(`Essa rota só poderá ser acessada por usuários logados. Bem vindo ${req.kauth.grant.access_token.content.name}.`);
});

app.get('/role-access', keycloak.protect('realm:ticaracatica'), function(req, res) {
  res.send('Essa rota só poderá ser acessada por usuários que tenham a role ticaracatica');
});

const port = process.env.PORT || 8081;
app.listen(port, function() {
  console.log(`Back-end rodando na URL http://localhost:${port}`);
});
