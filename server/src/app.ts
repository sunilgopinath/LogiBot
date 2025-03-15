/** src/app.ts **/

// Global dependencies
import express from "express";
import { json } from "body-parser";
import cors from 'cors';

// Project dependencies
import healthRouter from "./routes/health.routes";

// Express initialization
const app = express();

// Middlewares
app.use(json());
app.use(cors());

// Routes
app.use(healthRouter);

export default app;