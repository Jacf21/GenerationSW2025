import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerTopicos } from "../../../services/topicoService";
import { obtenerPantallaPorTopico } from "../../../services/pantallaTopicoService";

export default function ListaPantallasEstudiantePage() {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      // ⬅️ tu backend devuelve { data: [...] }
      const res = await obtenerTopicos();
      const topicos = res.data || [];

      const visibles = [];

      for (const t of topicos) {
        const pantalla = await obtenerPantallaPorTopico(t.id);

        if (pantalla && pantalla.visible) {
          visibles.push({
            id: t.id,
            nombre: t.nombre ?? `Tópico ${t.id}`,
          });
        }
      }

      setLista(visibles);
    } catch (err) {
      console.error("Error cargando tópicos visibles:", err);
      setLista([]);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Pantallas Publicadas</h1>
      <p>Selecciona un tópico para ver su contenido.</p>

      {lista.length === 0 && <p>No hay pantallas publicadas aún.</p>}

      <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
        {lista.map((t) => (
          <li
            key={t.id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 10,
              cursor: "pointer",
              borderRadius: 8,
            }}
            onClick={() => navigate(`/topico/${t.id}`)}
          >
            📘 {t.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
