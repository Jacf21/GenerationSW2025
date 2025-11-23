import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/comunes/navBar/navbar";
import Sidebar from "./components/comunes/sidebar/sidebar";
import Footer from "./components/comunes/footer/footer";
import Inicio from "./pages/inicio/inicio";
import CrearCurso from "./pages/profesor/crearCurso/CrearCursoPage";
import MisCursosPage from "./pages/profesor/misCursos/misCursosPage";
import Registro from "./pages/Registro/Registro";
import useTheme from "./hooks/useTheme";
import LoginPage from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthContex";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/adminDashboard";
import EstudianteDashboard from "./pages/estudiante/estudianteDashboard";
import MatriculacionPage from "./pages/estudiante/matriculacion/MatriculacionPage";
import ProfesorDashboard from "./pages/profesor/profesorDashboard";
import EditorDashboard from "./pages/editor/editorDashboard";
import GestionarUsers from "./pages/admin/gestionarUsers/gestionarUsers";
import TopicosPage from "./pages/editor/topicos/topicosPage";
import TopicosViewerPage from "./pages/editor/topicos/TopicosViewerPage";
import TopicosList from "./pages/editor/topicos/ListarTopicos/TopicosList";
import GestionarContenido from "./pages/editor/contenido/gestionarContenido/gestionarContenido";

import Plantilla1 from "./pages/editor/Plantillas/Plantilla1";
import Plantilla2 from "./pages/editor/Plantillas/Plantilla2";
import Plantilla3 from "./pages/editor/Plantillas/Plantilla3";

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
                  <Route path="/mis-cursos" element={<MisCursosPage />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={["est"]} />}>
                  <Route path="/estudiante" element={<EstudianteDashboard />} />
                  <Route path="/matriculacion" element={<MatriculacionPage />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={["edit"]} />}>
                  <Route path="/editor" element={<EditorDashboard />} />
                  <Route path="/crear-topico" element={<TopicosPage />} />
                  <Route path="/lista-topicos" element={<TopicosList />} />
                  <Route path="/contenido" element={<TopicosViewerPage />} />
                  <Route path="/editor/topicos" element={<TopicosList />} />
                  <Route path="/contenidos" element={<GestionarContenido />} />
                  {/* opcionales */}

                  {/* Rutas de Plantillas */}
                  <Route path="/plantillas/1" element={<Plantilla1 />} />
                  <Route path="/plantillas/2" element={<Plantilla2 />} />
                  <Route path="/plantillas/3" element={<Plantilla3 />} />
                </Route>
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
