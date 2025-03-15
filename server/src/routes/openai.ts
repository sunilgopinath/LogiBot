// server/src/routes/ai.routes.ts
import { Router } from 'express';
import { aiController } from '../controllers/openai';

const router = Router();

router.post('/analyze-shipment', aiController.analyzeShipment);

export default router;