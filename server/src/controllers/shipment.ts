// server/src/controllers/shipment.controller.ts
import { Request, Response } from 'express';
import { shipmentService } from '../services/shipment';
import BadRequestError from '../errors/BadRequestError';

export const shipmentController = {
  queryShipment: (req: Request, res: Response) => {
    const { query } = req.body;
    
    if (!query) {
      throw new BadRequestError({
        message: 'Query is required',
        logging: true
      });
    }
    
    const response = shipmentService.processQuery(query);
    res.json({ response });
  }
};