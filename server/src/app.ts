/** src/app.ts **/

// Global dependencies
import express from "express";
import { json } from "body-parser";
import cors from 'cors';

// Project dependencies
import userRouter from "./routes/users";
import healthRouter from "./routes/health";
import errorHandler from "./middlewares/error";
import openaiRouter from './routes/openai';
import shipmentRouter from './routes/shipment';
import anthropicRouter from './routes/anthropic';

// Express initialization
const app = express();

// Middlewares
app.use(json());
app.use(cors());

// Routes
app.use('/api', healthRouter);
app.use(userRouter);
app.use('/api/ai', openaiRouter);
app.use('/api/shipment', shipmentRouter);
app.use('/api/route', anthropicRouter);
app.use(errorHandler);

export default app;