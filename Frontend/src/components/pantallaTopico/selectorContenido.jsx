export default function SelectorContenido({ contenidos, agregarContenido }) {
  return (
    <div>
      <h3>Agregar contenido</h3>
      <select onChange={(e) => agregarContenido(e.target.value)} defaultValue="">
        <option value="" disabled>
          Seleccionar contenido
        </option>
        {contenidos.map((c) => (
          <option key={c.id} value={c.id}>
            {c.tipo} - #{c.id}
          </option>
        ))}
      </select>
      <hr />
    </div>
  );
}
