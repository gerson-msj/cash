// import http from "http";

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "application/json");
  
//   if (req.url === "/" && req.method === "GET") {
//     res.end(JSON.stringify({ message: "API funcionando!" }));
//   } else if (req.url === "/users" && req.method === "GET") {
//     res.end(JSON.stringify([{ id: 1, name: "Gerson" }]));
//   } else {
//     res.statusCode = 404;
//     res.end(JSON.stringify({ error: "Rota não encontrada" }));
//   }
// });

// const PORT = 3000;
// server.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));

import express from "express"

const app = express()
app.use(express.json())

app.get("/", (_, res) => res.json({ message: "API online!" }))
app.get("/users", (_, res) => res.json([{ id: 1, name: "Gerson" }]))

app.listen(3000, () => console.log("🚀 Rodando em http://localhost:3000"))