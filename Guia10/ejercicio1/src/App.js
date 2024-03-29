import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Registrarse from './pages/Registrarse';
import Bienvenido from './pages/Bienvenido';
import Tareas from "./pages/Tareas";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PrivateRoute><Bienvenido/></PrivateRoute>} />
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
          <Route path="/tareas/:id" element={<PrivateRoute><Tareas /></PrivateRoute>} />
          <Route path="/registrarse" element={<Registrarse/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
