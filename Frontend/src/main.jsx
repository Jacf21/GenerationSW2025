import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './estilos/variables.css';
import './estilos/reset.css';
import './estilos/App.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
