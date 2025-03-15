// server/src/routes/route.routes.ts
import { Router } from 'express';
import { routeController } from '../controllers/anthropic';

const router = Router();

router.post('/optimize', routeController.optimizeRoute);

export default router;