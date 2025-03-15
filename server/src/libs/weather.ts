// server/src/libs/weather.lib.ts
import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../logger';

dotenv.config();

// Free Weather API service
export const weatherService = {
  getWeatherForLocation: async (location: string) => {
    try {
      const apiKey = process.env.WEATHER_API_KEY;
      
      // If no API key, return mock data
      if (!apiKey) {
        logger.warn('Weather API key is missing. Using mock data.');
        return getMockWeatherData(location);
      }
      
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
      );
      
      return response.data;
    } catch (error) {
      logger.error('Error fetching weather data:', error);
      return getMockWeatherData(location);
    }
  }
};

// Mock weather data for testing or when API key is not available
function getMockWeatherData(location: string) {
  // Create somewhat realistic weather data with some randomization
  const conditions = [
    'Sunny', 'Partly cloudy', 'Cloudy', 'Overcast', 
    'Mist', 'Light rain', 'Moderate rain', 'Heavy rain',
    'Light snow', 'Moderate snow', 'Heavy snow', 'Thunderstorm'
  ];
  
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const temp_c = Math.floor(Math.random() * 35) - 5; // -5 to 30°C
  const temp_f = Math.round((temp_c * 9/5) + 32);
  const humidity = Math.floor(Math.random() * 60) + 40; // 40-100% humidity
  const wind_mph = Math.floor(Math.random() * 30); // 0-30 mph winds
  
  return {
    location: {
      name: location,
      region: "Mock Region",
      country: "Mock Country",
      localtime: new Date().toISOString()
    },
    current: {
      temp_c,
      temp_f,
      condition: {
        text: randomCondition,
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1000
      },
      wind_mph,
      humidity,
      feelslike_c: temp_c - 2,
      feelslike_f: temp_f - 3
    }
  };
}