// server/src/controllers/ai.controller.ts
import { Request, Response } from 'express';
import { aiService } from '../services/openai';
import BadRequestError from '../errors/BadRequestError';

export const aiController = {
  /**
   * Analyzes shipment using AI and weather data
   */
  analyzeShipment: async (req: Request, res: Response) => {
    const { shipmentData } = req.body;
    
    if (!shipmentData) {
      throw new BadRequestError({
        message: 'Shipment data is required',
        logging: true
      });
    }
    
    const required = ['id', 'status', 'location', 'eta'];
    for (const field of required) {
      if (!shipmentData[field]) {
        throw new BadRequestError({
          message: `Shipment data is missing required field: ${field}`,
          logging: true
        });
      }
    }
    
    const result = await aiService.analyzeShipment(shipmentData);
    
    res.json({
      success: true,
      ...result
    });
  }
};