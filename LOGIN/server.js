// server.js

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

//  Conexão com Supabase
const supabaseUrl = "https://wvpatscikilyayqgjvre.supabase.co";
const supabaseKey = "Rm@2025"; 
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota de login
app.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const { data, error } = await supabase
      .from("login") // nome da tabela no Supabase
      .select("*")
      .eq("usuario", usuario)
      .eq("senha", senha); // ⚠️ recomenda-se usar hash futuramente

    if (error) {
      console.error("Erro ao consultar Supabase:", error);
      return res.status(500).send("Erro no Supabase");
    }

    if (data.length > 0) {
      res.send({ sucesso: true, usuario: data[0] });
    } else {
      res.send({ sucesso: false });
    }
  } catch (err) {
    console.error("Erro geral no servidor:", err);
    res.status(500).send("Erro interno");
  }
});

// Inicializa o servidor
app.listen(3001, () => {
  console.log("Servidor usando Supabase rodando na porta 3001");
});
