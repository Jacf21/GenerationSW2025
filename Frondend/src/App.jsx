import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(data => setMensaje(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{mensaje}</h1>
      </header>
    </div>
  );
}

export default App;