import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Paginas
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Registrarse from './pages/Registrarse';
import Bienvenido from './pages/Bienvenido';
import ListaUsuarios from "./pages/ListaUsuarios";
import TodoList from './pages/TodoList';
import DetalleTodo from "./pages/DetalleTodo";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Layout from "./components/Layout/Layout";

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PrivateRoute><Bienvenido/></PrivateRoute>} />
          
          <Route path="/listado_usuarios" element={<PrivateRoute><ListaUsuarios /></PrivateRoute>} />
          
          <Route path="/tareas" element={<PrivateRoute><TodoList /></PrivateRoute>} />
          <Route path="/tareas/:id" element={<PrivateRoute><DetalleTodo /></PrivateRoute>} />
          
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
          <Route path="/registrarse" element={<Registrarse/>} />
          
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
