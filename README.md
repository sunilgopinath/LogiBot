# LogiBot: AI-Powered Logistics Assistant

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Express](https://img.shields.io/badge/Express-4.18.2-green.svg)
![OpenAI](https://img.shields.io/badge/OpenAI-4.11.0-orange.svg)

LogiBot is an intelligent logistics assistant that combines real-time weather data, predictive analysis, and state-of-the-art AI to provide actionable insights for shipment management. This application demonstrates how AI can revolutionize logistics operations by anticipating delays, suggesting optimal routes, and providing real-time updates.

## 🚀 Features

- **AI-Powered Shipment Analysis**: Analyzes shipments using OpenAI's GPT models to provide insights and recommendations
- **Real-Time Weather Integration**: Fetches current weather conditions at shipment locations to predict potential delays
- **Delay Risk Assessment**: Calculates delay probability based on multiple factors
- **Clean, Modern UI**: Built with React and Tailwind CSS for a responsive experience
- **Type-Safe**: Fully typed with TypeScript for robust code quality
- **RESTful API**: Well-structured Express backend with clean architecture patterns

## 🧠 AI Integration Showcase

This project demonstrates expertise with multiple AI technologies:

- **OpenAI Integration**: Uses GPT models to analyze logistics data and generate insights
- **Weather API**: Incorporates real-world data to enhance AI predictions
- **Context-Aware Analysis**: AI considers shipment details, location, and environmental factors

## 🛠️ Technical Architecture

### Backend (Express + TypeScript)

The backend follows clean architecture principles with a clear separation of concerns:

```
server/
├── src/
│   ├── routes/         # API route definitions
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   ├── libs/           # External API integrations
│   ├── middlewares/    # Express middlewares
│   ├── errors/         # Custom error handling
│   └── index.ts        # Application entry point
```

### Frontend (React + TypeScript + Tailwind CSS)

The frontend implements modern React practices and clean component architecture:

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── services/       # API client code
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sunilgopinath/LogiBot.git
   cd logibot
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create environment files:

   In the server directory, create a `.env` file:
   ```
   PORT=3001
   OPENAI_API_KEY=your_openai_api_key
   WEATHER_API_KEY=your_weather_api_key
   ```

   In the client directory, ensure the proxy is set in `package.json`:
   ```json
   "proxy": "http://localhost:3001"
   ```

### Running the Application

From the root directory:

```bash
# Start both frontend and backend in development mode
npm start

# Start only the backend
npm run server

# Start only the frontend
npm run client
```

The server will run on port 3001, and the client will run on port 3000.

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 📝 API Documentation

### Shipment Lookup

```
POST /api/shipment/query
Body: { "query": "Where is shipment #123?" }
```

### AI Shipment Analysis

```
POST /api/ai/analyze-shipment
Body: { "shipmentData": { "id": "123", "status": "In Transit", "location": "Chicago", "eta": "2023-03-15" } }
```

## 🔮 Future Enhancements

- **Carrier API Integration**: Connect with real carrier APIs (FedEx, UPS, DHL)
- **Route Visualization**: Display shipment routes on interactive maps
- **Predictive ETAs**: Machine learning model for more accurate delivery time predictions
- **Voice Interface**: Integration with voice assistants for hands-free operation
- **Blockchain Integration**: Immutable shipment records and smart contracts for logistics

## 🔧 Technologies Used

### Backend
- **Express**: Fast, unopinionated web framework for Node.js
- **TypeScript**: Static typing for enhanced code quality
- **OpenAI API**: Advanced language model integration
- **Weather API**: Real-time weather data
- **Zod**: Runtime type validation
- **Express Async Errors**: Simplified async error handling

### Frontend
- **React**: Component-based UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client

## 📚 Architecture Decisions

### Why TypeScript?

TypeScript provides static typing that helps catch errors early in the development process, making our code more robust and easier to maintain. It also enables better IDE support and documentation.

### Why Express?

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building APIs. Its simplicity and middleware approach make it perfect for building scalable applications.

### Why Clean Architecture?

The project follows clean architecture principles to ensure separation of concerns, testability, and maintainability. This approach makes the codebase more modular and easier to understand.

### Why OpenAI?

OpenAI's models provide state-of-the-art natural language understanding and generation capabilities, enabling sophisticated analysis of logistics data and human-like insights.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Your Name - [GitHub](https://github.com/sunilgopinath)