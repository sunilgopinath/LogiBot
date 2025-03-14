// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const getShipmentId = (query:string, char:string) =>{
  if (query.indexOf(char) === -1) {
      return null;
  } else {
      return query.substring(query.indexOf(char) + 1);
  }
}

const app: Express = express();
const port = process.env.PORT || 3000;

const shipments = [
  { id: "123", status: "In Transit", location: "Chicago", eta: "March 16, 2025" },
  { id: "456", status: "Delivered", location: "Los Angeles", eta: "March 14, 2025" },
];

app.use(express.json()); // Parse JSON bodies

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Welcome to LogiBot' });
});

app.post('/api/query', (req, res) => {
  const { query } = req.body;

  // Check if the query asks about a shipment
  const shipmentMatch = query.match(/#(\d+)/);
  if (shipmentMatch) {
    const shipmentId = shipmentMatch[1];
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (shipment) {
      // Return structured shipment details
      res.json({
        response: {
          type: "shipment",
          data: {
            id: shipment.id,
            status: shipment.status,
            location: shipment.location,
            eta: shipment.eta
          }
        }
      });
    } else {
      // Shipment not found
      res.json({
        response: {
          type: "error",
          message: `Shipment #${shipmentId} not found`
        }
      });
    }
  } else {
    // Fallback for non-shipment queries
    res.json({
      response: {
        type: "text",
        message: `You asked: ${query}`
      }
    });
  }
});

// Export the app instead of calling app.listen here
export default app;

// If this file is run directly (e.g., via nodemon), start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}