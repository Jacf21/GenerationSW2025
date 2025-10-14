import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/comunes/navBar/navbar";
import Sidebar from "./components/comunes/sidebar/sidebar";
import Footer from "./components/comunes/footer/footer";
import Inicio from "./pages/inicio/inicio";
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
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/registro" element={<Registro />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
