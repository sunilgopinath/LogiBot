/** src/app.ts **/

// Global dependencies
import express from "express";
import { json } from "body-parser";
import cors from 'cors';

// Project dependencies
import userRouter from "./routes/users";
import healthRouter from "./routes/health";
import errorHandler from "./middlewares/error";

// Express initialization
const app = express();

// Middlewares
app.use(json());
app.use(cors());

// Routes
app.use(healthRouter);
app.use(userRouter);
app.use(errorHandler);

export default app;