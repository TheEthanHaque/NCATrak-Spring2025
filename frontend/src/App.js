import React, { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('Connecting to backend...');

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/test')
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => setMessage('Failed to connect to backend.'));
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>NCA-Trak System</h1>
            <h3>{message}</h3>
        </div>
    );
}

export default App;
