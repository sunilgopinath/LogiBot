// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Welcome to LogiBot' });
});

app.post('/api/query', (req, res) => {
  const { query } = req.body; // Extract query from request body
  res.json({ response: `You asked: ${query}` }); // Echo back with prefix
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});