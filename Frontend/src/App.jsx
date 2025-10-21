import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/comunes/navBar/navbar";
import Sidebar from "./components/comunes/sidebar/sidebar";
import Footer from "./components/comunes/footer/footer";
import Inicio from "./pages/inicio/inicio";
import CrearCurso from "./pages/crearCurso/CrearCursoPage";
import Registro from "./pages/Registro/Registro";
import useTheme from "./hooks/useTheme";
import LoginPage from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthContex";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/adminDashboard";
import EstudianteDashboard from "./pages/estudiante/estudianteDashboard";
import ProfesorDashboard from "./pages/profesor/profesorDashboard";
import EditorDashboard from "./pages/editor/editorDashboard";
import GestionarUsers from "./pages/admin/gestionarUsers/gestionarUsers";

import "./index.css";
import "./App.css";
import "./styles/variables.css";

function App() {
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <Router>
        <div className="App" data-theme={theme}>
          <NavBar />
          <div className="layout">
            <Sidebar />
            <main className="main-content">
              <div className="page-container">
                <Routes>
                  {/* Público */}
                  <Route path="/" element={<Inicio />} />
                  <Route path="/registro" element={<Registro />} />
                  <Route path="/login" element={<LoginPage />} />

                  {/* 🔒 Secciones protegidas por tipo */}
                  <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/gestionar-usuarios" element={<GestionarUsers />} />
                  </Route>

                  <Route element={<PrivateRoute allowedRoles={["profesor"]} />}>
                    <Route path="/profesor" element={<ProfesorDashboard />} />
                    <Route path="/crear-curso" element={<CrearCurso />} />
                  </Route>

                  <Route element={<PrivateRoute allowedRoles={["est"]} />}>
                    <Route path="/estudiante" element={<EstudianteDashboard />} />
                  </Route>

                  <Route element={<PrivateRoute allowedRoles={["edit"]} />}>
                    <Route path="/editor" element={<EditorDashboard />} />
                  </Route>
                </Routes>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
