import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/comunes/navBar/navBar";
import Sidebar from "./components/comunes/sidebar/sidebar";
import Footer from "./components/comunes/footer/footer";
import Inicio from "./pages/inicio/inicio";
import CrearCurso from "./pages/crearCurso/CrearCursoPage";
import "./App.css";
import "./styles/variables.css";

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
