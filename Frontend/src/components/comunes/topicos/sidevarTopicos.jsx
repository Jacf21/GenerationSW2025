export default function SidebarTopicos({ topicos, contenidos, onSeleccionarContenido }) {
  return (
    <div className="sidebar-topicos">
      <h3>Lista de Tópicos</h3>
      {topicos.map((t) => (
        <div key={t.id} className="topico-section">
          <h4>{t.titulo}</h4>
          <ul>
            {(contenidos[t.id] || []).map((c) => (
              <li key={c.id} onClick={() => onSeleccionarContenido(c)} className="contenido-item">
                📄 {c.nombre_archivo}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
