import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SelectorContenido from "../../../components/pantallaTopico/selectorContenido";
import BloqueContenido from "../../../components/pantallaTopico/BloqueContenido";
import useEditorPantallaTopico from "../../../hooks/useEditorPantallaTopico";
import SelectorTopico from "../../../components/pantallaTopico/selectorTopico";
import "./editorPantallaTopico.css";

export default function EditorPantallaTopicoVertical({ id_editor }) {
  const [idTopico, setIdTopico] = useState(null);

  const {
    pantalla,
    contenidos,
    contenidosPantalla,
    agregarContenido,
    borrarAsignacion,
    cambiarVisibilidad,
    reordenar,
  } = useEditorPantallaTopico(idTopico, id_editor);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    reordenar(source.index, destination.index);
  };

  return (
    <div className="editor-pantalla" style={{ padding: 20 }}>
      <SelectorTopico idTopico={idTopico} setIdTopico={setIdTopico} />

      {!idTopico && <p>Seleccione un tópico para empezar a editar.</p>}

      {idTopico && (
        <>
          <h2>Editor del Tópico #{idTopico}</h2>

          {pantalla && (
            <button onClick={cambiarVisibilidad}>
              {pantalla.visible ? "Ocultar" : "Publicar"}
            </button>
          )}

          <SelectorContenido contenidos={contenidos} agregarContenido={agregarContenido} />

          <h3>Vista previa de la pantalla</h3>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="pantalla">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {contenidosPantalla
                    .sort((a, b) => a.orden - b.orden)
                    .map((item, index) => (
                      <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <BloqueContenido item={item} borrar={() => borrarAsignacion(item.id)} />
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </div>
  );
}
