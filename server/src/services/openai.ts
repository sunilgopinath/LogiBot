// server/src/services/ai.service.ts
import { openai } from '../libs/openai';
import { weatherService } from '../libs/weather';
import logger from '../logger';

type ShipmentData = {
  id: string;
  status: string;
  location: string;
  eta: string;
};

export const aiService = {
  /**
   * Analyzes shipment using weather data and OpenAI
   */
  analyzeShipment: async (shipmentData: ShipmentData) => {
    try {
      // Get weather data for the shipment location
      const weatherData = await weatherService.getWeatherForLocation(shipmentData.location);
      
      // Analyze weather conditions to determine if they might cause delays
      const conditions = weatherData.current.condition.text;
      const windMph = weatherData.current.wind_mph;
      const temperature = weatherData.current.temp_f;
      
      // Generate delay information based on weather conditions
      let delayRisk = "low";
      let delayInfo = `Current weather: ${conditions}, Wind: ${windMph} mph, Temperature: ${temperature}°F`;
      
      const severeConditions = [
        'Thunderstorm', 'Heavy rain', 'Heavy snow', 'Blizzard', 'Fog',
        'Ice', 'Sleet', 'Storm', 'Hurricane', 'Tornado'
      ];
      
      const moderateConditions = [
        'Moderate rain', 'Moderate snow', 'Light snow', 'Overcast',
        'Drizzle', 'Mist', 'Light rain'
      ];
      
      if (severeConditions.some(c => conditions.toLowerCase().includes(c.toLowerCase())) || windMph > 25) {
        delayRisk = "high";
      } else if (moderateConditions.some(c => conditions.toLowerCase().includes(c.toLowerCase())) || windMph > 15) {
        delayRisk = "medium";
      }
      
      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        logger.warn('OpenAI API key is not set. Using mock response.');
        return {
          analysis: mockAnalysis(shipmentData, delayInfo, delayRisk),
          weatherData,
          delayInfo,
          delayRisk
        };
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are LogiBot, an AI assistant specialized in logistics. Analyze shipping data and weather conditions to provide insights on potential delays and recommendations.'
          },
          {
            role: 'user',
            content: `Analyze this shipment with current weather data:
              Shipment ID: ${shipmentData.id}
              Current Status: ${shipmentData.status}
              Current Location: ${shipmentData.location}
              Original ETA: ${shipmentData.eta}
              Weather Conditions: ${delayInfo}
              Delay Risk: ${delayRisk}`
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      });
      
      return {
        analysis: response.choices[0].message.content,
        weatherData,
        delayInfo,
        delayRisk
      };
    } catch (error) {
      logger.error('Error analyzing shipment:', error);
      throw error;
    }
  }
};

// Mock function if API key isn't available
function mockAnalysis(shipmentData: ShipmentData, delayInfo: string, delayRisk: string) {
  return `
    ## Shipment Analysis
    
    **Shipment ID:** ${shipmentData.id}
    **Current Status:** ${shipmentData.status}
    **Location:** ${shipmentData.location}
    **Original ETA:** ${shipmentData.eta}
    
    **Weather Impact Analysis:**
    ${delayInfo}
    
    **Delay Risk:** ${delayRisk.toUpperCase()}
    
    ${delayRisk === "high" ? 
      "The current severe weather conditions are likely to cause significant delays. Consider notifying the customer about potential delivery adjustments." :
      delayRisk === "medium" ? 
        "There is a moderate risk of delay due to weather conditions. Monitor shipment progress closely." :
        "Weather conditions are favorable. No weather-related delays expected."
    }
    
    **Recommended Actions:**
    1. ${delayRisk === "high" ? 
        "Immediately contact the carrier to confirm new ETA" : 
        "Continue monitoring shipment progress"
      }
    2. ${delayRisk === "high" ? 
        "Proactively notify the customer about potential delays" : 
        "No additional actions required at this time"
      }
    3. ${delayRisk === "high" ? 
        "Consider alternative routing options if available" : 
        "Ensure delivery arrangements are in place"
      }
    
    **Estimated Impact:**
    ${delayRisk === "high" ? 
      "Potential delay of 1-2 business days." :
      delayRisk === "medium" ? 
        "Possible minor delays (less than 24 hours)." :
        "No significant impact expected."
    }
  `;
}