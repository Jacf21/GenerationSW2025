import useTopicos from "../../hooks/useTopico";

export default function SelectorTopico({ idTopico, setIdTopico }) {
  const { topicos, loading, error } = useTopicos();

  return (
    <div style={{ marginBottom: 20 }}>
      <label>
        <strong>Seleccionar tópico:</strong>
      </label>

      <select
        value={idTopico || ""}
        onChange={(e) => setIdTopico(Number(e.target.value))}
        style={{ marginLeft: 10, padding: "6px 8px" }}
        disabled={loading}
      >
        <option value="">-- Seleccionar --</option>

        {loading && <option>Cargando...</option>}
        {!loading &&
          topicos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre || t.titulo || `Tópico ${t.id}`}
            </option>
          ))}
      </select>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
