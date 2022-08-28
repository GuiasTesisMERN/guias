import React from 'react';
import ReactDOM from 'react-dom/client';
import Elemento from "./Elemento";
import MiLista from "./MiLista";
import Bienvenido from './components/Bienvenido';
import "./index.css";

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
    {/* Renderizado condicional */}
    <Bienvenido estaLogeado={true}/>

    {/*<Elemento name="Jose Munguia"/>*/}
    <h3 className="titulo-lista">Mi lista de tareas</h3>
    <MiLista tareas={tareas} />

  </React.StrictMode>
);
