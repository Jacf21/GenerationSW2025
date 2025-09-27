import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './componentes/comunes/NavBar/NavBar';
import Sidebar from './componentes/comunes/Sidebar/Sidebar';
import Footer from './componentes/comunes/Footer/Footer';
import Inicio from './paginas/Inicio/Inicio';
import Registro from './paginas/Registro/Registro';
import CrearCurso from './paginas/CrearCurso/CrearCursoPage';
//import Login from './paginas/Login/Login';
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
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/crear-curso" element={<CrearCurso />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;