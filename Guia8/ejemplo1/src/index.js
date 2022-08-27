import React from 'react';
import ReactDOM from 'react-dom/client';
import Elemento from "./Elemento";
import MiLista from "./MiLista";

const root = ReactDOM.createRoot(document.getElementById('root'));

const tareas = [
  {
    id: 1,
    titulo: "Ir al supermercado",
  },
  {
    id: 2,
    titulo: "Limpiar la casa",
  },
  {
    id: 3,
    titulo: "Cocinar el almuerzo",
  }
]

root.render(
  <React.StrictMode>
    <Elemento name="Jose Munguia"/>
    <h3>Mi lista de tareas</h3>
    <MiLista tareas={tareas} />
  </React.StrictMode>
);
