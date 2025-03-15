// server/src/services/route.service.ts
import { anthropic } from '../libs/anthropic';
import logger from '../logger';

interface DeliveryLocation {
  id: string;
  name: string;
  address: string;
  timeWindow?: string;
  priority?: number;
}

export const routeService = {
  /**
   * Optimizes delivery routes using Anthropic Claude
   */
  optimizeRoute: async (
    startingLocation: string,
    deliveryLocations: DeliveryLocation[],
    constraints: string
  ) => {
    try {
      // Check if Anthropic API key is available
      if (!process.env.ANTHROPIC_API_KEY) {
        logger.warn('Anthropic API key is not set. Using mock response.');
        return mockRouteOptimization(startingLocation, deliveryLocations, constraints);
      }

      // Format delivery locations for prompt
      const formattedLocations = deliveryLocations.map(loc => 
        `ID: ${loc.id}, Name: ${loc.name}, Address: ${loc.address}${loc.timeWindow ? `, Time Window: ${loc.timeWindow}` : ''}${loc.priority ? `, Priority: ${loc.priority}` : ''}`
      ).join('\n');

      const response = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: `As a logistics route optimization expert, analyze these delivery locations and create the most efficient route:

            Starting Location: ${startingLocation}
            
            Delivery Locations:
            ${formattedLocations}
            
            Constraints/Considerations:
            ${constraints}
            
            Please provide:
            1. An optimized route sequence (with location IDs)
            2. Estimated total distance and time
            3. Time window considerations
            4. Key decisions made in optimization
            5. Any potential issues with the route
            6. Recommendations to improve efficiency`
          }
        ],
        temperature: 0.2,
      });
      
      // Correctly extract the text content from the response
      const textContent = response.content.find(
        content => content.type === 'text'
      );
      
      if (!textContent || textContent.type !== 'text') {
        throw new Error('Unexpected response format from Anthropic API');
      }
      
      return textContent.text;
    } catch (error) {
      logger.error('Error calling Anthropic for route optimization:', error);
      throw error;
    }
  }
};

// Mock function if API key isn't available
function mockRouteOptimization(
  startingLocation: string, 
  deliveryLocations: DeliveryLocation[], 
  constraints: string
) {
  // Sort locations by priority if available
  const sortedLocations = [...deliveryLocations].sort((a, b) => 
    (b.priority || 0) - (a.priority || 0)
  );
  
  const locationIds = sortedLocations.map(loc => loc.id);
  
  return `
    ## Route Optimization Analysis

    **Optimized Route Sequence:**
    1. Starting Location: ${startingLocation}
    2. ${sortedLocations.map((loc, index) => `Location ${loc.id}: ${loc.name}`).join('\n    ' + (2 + 1) + '. ')}
    3. Return to ${startingLocation}

    **Estimated Route Statistics:**
    - Total Distance: ~42 miles
    - Estimated Time: 3.5 hours (including loading/unloading)
    - Estimated Completion: 2:30 PM

    **Time Window Considerations:**
    - All high-priority deliveries are scheduled early in the route
    - Location ${locationIds[1]} has a tight delivery window that is accommodated
    - Avoided peak traffic times on major highways

    **Key Optimization Decisions:**
    - Prioritized locations with specific time windows
    - Clustered nearby deliveries to minimize backtracking
    - Placed high-priority deliveries earlier in the route
    - Selected routes that avoid known traffic congestion areas

    **Potential Issues:**
    - Unexpected traffic could impact later deliveries
    - Construction on Main Street might require rerouting between locations ${locationIds[0]} and ${locationIds[1]}
    - Limited parking at location ${locationIds[2]} might increase delivery time

    **Recommendations for Improved Efficiency:**
    - Consider splitting the route if time windows become more restrictive
    - Add a midday break to account for driver rest requirements
    - Communicate with customers at locations ${locationIds[3]} and ${locationIds[4]} about possible delivery time flexibility
    - Monitor weather conditions which may impact the route
  `;
}