const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = 443; // Porta HTTPS

app.use(cors());
app.use(express.json());

let estadoAtual = "Sem dados ainda";

// Endpoint onde o ESP32 envia dados
app.post('/update', (req, res) => {
  const { mensagem } = req.body;

  if (mensagem) {
    estadoAtual = mensagem;
    console.log("Atualização do ESP32:", mensagem);
    return res.status(200).json({ status: 'OK' });
  }

  res.status(400).json({ error: 'Mensagem ausente' });
});

// Endpoint onde o React (via HTTPS) busca o estado
app.get('/estado', (req, res) => {
  res.json({ mensagem: estadoAtual });
});

// Carrega certificados SSL
const options = {
  key: fs.readFileSync('./certs/privkey.pem'),
  cert: fs.readFileSync('./certs/fullchain.pem')
};

// Inicia servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});