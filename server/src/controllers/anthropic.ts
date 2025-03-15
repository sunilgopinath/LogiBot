// server/src/controllers/route.controller.ts
import { Request, Response } from 'express';
import { routeService } from '../services/anthropic';
import BadRequestError from '../errors/BadRequestError';

export const routeController = {
  /**
   * Optimizes delivery routes using Anthropic Claude
   */
  optimizeRoute: async (req: Request, res: Response) => {
    const { startingLocation, deliveryLocations, constraints } = req.body;
    
    if (!startingLocation) {
      throw new BadRequestError({
        message: 'Starting location is required',
        logging: true
      });
    }
    
    if (!deliveryLocations || !Array.isArray(deliveryLocations) || deliveryLocations.length === 0) {
      throw new BadRequestError({
        message: 'At least one delivery location is required',
        logging: true
      });
    }
    
    const analysis = await routeService.optimizeRoute(
      startingLocation,
      deliveryLocations,
      constraints || ''
    );
    
    res.json({
      success: true,
      analysis
    });
  }
};