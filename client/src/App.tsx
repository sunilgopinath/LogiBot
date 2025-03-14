import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Keep this if you have custom styles, but we'll use Tailwind

function App() {
  // State for the welcome message, query input, and query response
  const [welcomeMessage, setWelcomeMessage] = useState<string>('Loading...');
  const [query, setQuery] = useState<string>(''); // User input
  const [response, setResponse] = useState<string>(''); // Backend response

  // Fetch the welcome message on mount
  useEffect(() => {
    axios
      .get('/api/hello')
      .then((res) => {
        setWelcomeMessage(res.data.message); // e.g., "Welcome to LogiBot"
      })
      .catch((error) => {
        console.error('Error fetching welcome message:', error);
        setWelcomeMessage('Failed to load');
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    axios
      .post('/api/query', { query }) // Send query to backend
      .then((res) => {
        setResponse(res.data.response); // Update response state
        setQuery(''); // Clear the input
      })
      .catch((error) => {
        console.error('Error submitting query:', error);
        setResponse('Error: Could not process query');
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
              onChange={(e) => setQuery(e.target.value)} // Update query state as user types
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

        {/* Query Response */}
        {response && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <p className="text-gray-800">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;