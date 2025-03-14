import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Define the response structure from the backend
interface ShipmentData {
  id: string;
  status: string;
  location: string;
  eta: string;
}

interface Response {
  type: 'shipment' | 'error' | 'text';
  data?: ShipmentData;
  message?: string;
}

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('Loading...');
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<Response | null>(null);

  // Fetch welcome message on mount
  useEffect(() => {
    axios
      .get('/api/hello')
      .then((res) => {
        setWelcomeMessage(res.data.message);
      })
      .catch((error) => {
        console.error('Error fetching welcome message:', error);
        setWelcomeMessage('Failed to load');
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('/api/query', { query })
      .then((res) => {
        setResponse(res.data.response); // Set the structured response
        setQuery(''); // Clear input
      })
      .catch((error) => {
        console.error('Error submitting query:', error);
        setResponse({ type: 'error', message: 'Error: Could not process query' });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Welcome Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{welcomeMessage}</h1>

        {/* Query Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="query">
              Ask LogiBot:
            </label>
            <input
              id="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., Where is shipment #123?"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>

        {/* Response Display */}
        {response && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            {response.type === 'shipment' && response.data ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Shipment #{response.data.id}</h2>
                <ul className="mt-2 text-gray-700">
                  <li><strong>Status:</strong> {response.data.status}</li>
                  <li><strong>Location:</strong> {response.data.location}</li>
                  <li><strong>ETA:</strong> {response.data.eta}</li>
                </ul>
              </div>
            ) : response.type === 'error' ? (
              <p className="text-red-600">{response.message}</p>
            ) : (
              <p className="text-gray-800">{response.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;