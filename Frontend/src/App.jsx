import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/comunes/navBar/navBar";
import Sidebar from "./components/comunes/sidebar/sidebar";
import Footer from "./components/comunes/footer/footer";
import Inicio from "./pages/inicio/inicio";
import CrearCurso from "./pages/crearCurso/CrearCursoPage";
import "./App.css";
import "./styles/variables.css";
import Registro from "./pages/Registro/Registro";
import useTheme from "./hooks/useTheme";
import "./App.css";
import "./index.css";

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className="App" data-theme={theme}>
        <NavBar />
        <div className="layout">
          <Sidebar />
          <main className="main-content">
            <div className="page-container">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/crear-curso" element={<CrearCurso />} />
                <Route path="/registro" element={<Registro />} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
