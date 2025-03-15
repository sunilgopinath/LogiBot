import { Request, Response } from 'express';
import { healthService } from '../services/health.service';

export const healthController = {
  getHello: (req: Request, res: Response) => {
    const message = healthService.getWelcomeMessage();
    res.json({ message });
  },
};