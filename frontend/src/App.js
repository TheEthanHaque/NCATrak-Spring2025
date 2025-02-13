import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting to backend...');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/test')
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => console.error('Failed to connect to backend:', error));
  }, []);


  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
