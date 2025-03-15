import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    // Fetch welcome message from backend
    fetch('http://localhost:3001/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Error fetching message:', error);
        setMessage('Error connecting to server');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <p>Logistics AI Application</p>
      </header>
    </div>
  );
}

export default App;