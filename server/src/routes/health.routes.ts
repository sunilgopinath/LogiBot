import { Router } from 'express';
import { healthController } from '../controllers/health.controller';

const router = Router();

router.get('/hello', healthController.getHello);

export default router;