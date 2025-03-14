import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('Loading...'); // State to hold the message

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios
      .get('/api/hello') // Proxy handles the localhost:3000 part
      .then((response) => {
        setMessage(response.data.message); // Update state with the message
      })
      .catch((error) => {
        console.error('Error fetching message:', error);
        setMessage('Failed to load message'); // Show error if fetch fails
      });
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1> {/* Display the fetched message */}
      </header>
    </div>
  );
}

export default App;