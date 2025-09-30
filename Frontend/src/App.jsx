import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './componentes/comunes/NavBar/NavBar';
import Sidebar from './componentes/comunes/Sidebar/Sidebar';
import Footer from './componentes/comunes/Footer/Footer';
import Inicio from './paginas/Inicio/Inicio';
import Registro from './paginas/Registro/Registro';
import Login from './paginas/Login/Login';
import CrearCurso from './paginas/CrearCurso/CrearCursoPage';
import PanelEstudiante from './paginas/PanelEstudiante/PanelEstudiante';
import PanelProfesor from './paginas/PanelProfesor/PanelProfesor';
import PanelAdmin from './paginas/PanelAdmin/PanelAdmin';
import './estilos/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="layout">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/crear-curso" element={<CrearCurso />} />
              {/* Agregar rutas de paneles */}
              <Route path="/panel-estudiante" element={<PanelEstudiante />} />
              <Route path="/panel-profesor" element={<PanelProfesor />} />
              <Route path="/panel-admin" element={<PanelAdmin />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;