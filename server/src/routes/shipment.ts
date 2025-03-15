// server/src/routes/shipment.routes.ts
import { Router } from 'express';
import { shipmentController } from '../controllers/shipment';

const router = Router();

router.post('/query', shipmentController.queryShipment);

export default router;