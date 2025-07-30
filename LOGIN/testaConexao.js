// testaConexao.js
const mysql = require("mysql");

const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "324651joao",
  database: "contas_a_pagar",
});

conexao.connect((erro) => {
  if (erro) {
    console.error(" Erro ao conectar ao banco:", erro.message);
  } else {
    console.log(" Conectado com sucesso ao banco!");
  }
  conexao.end();
});
