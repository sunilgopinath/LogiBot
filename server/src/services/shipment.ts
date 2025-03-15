// server/src/services/shipment.service.ts
import logger from '../logger';

// Mock shipment data
const shipments = [
  { id: "123", status: "In Transit", location: "Chicago", eta: "March 16, 2025" },
  { id: "456", status: "Delivered", location: "Los Angeles", eta: "March 14, 2025" },
];

export const shipmentService = {
  processQuery: (query: string) => {
    logger.info(`Processing query: ${query}`);
    
    // Check if the query asks about a shipment
    const shipmentMatch = query.match(/#(\d+)/);
    if (shipmentMatch) {
      const shipmentId = shipmentMatch[1];
      const shipment = shipments.find((s) => s.id === shipmentId);
      
      if (shipment) {
        // Return structured shipment details
        return {
          type: "shipment",
          data: {
            id: shipment.id,
            status: shipment.status,
            location: shipment.location,
            eta: shipment.eta
          }
        };
      } else {
        // Shipment not found
        return {
          type: "error",
          message: `Shipment #${shipmentId} not found`
        };
      }
    } else {
      // Fallback for non-shipment queries
      return {
        type: "text",
        message: `You asked: ${query}`
      };
    }
  }
};