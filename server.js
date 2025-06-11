const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let estado = { mensagem: "Tudo limpo. Sensor em funcionamento." };

// Endpoint acessado pelo React ou navegador
app.get("/estado", (req, res) => {
  res.json(estado);
});

// Endpoint usado pelo ESP32 para enviar dados
app.post("/update", (req, res) => {
  estado = req.body;
  console.log("Atualização recebida do ESP32:", estado);
  res.json({ status: "ok" });
});

// Porta fornecida pelo Railway ou padrão 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta ${PORT}`);
});
