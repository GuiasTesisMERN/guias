import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Registrarse from './pages/Registrarse';
import Bienvenido from './pages/Bienvenido';

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
          <Route path="/registrarse" element={<Registrarse/>} />
          <Route path="/lista/:id" element={<ComponentePrueba/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function ComponentePrueba() {

  const { id } = useParams();

  return (
    <p>
      Este es el valor del parámetro (id) {id}
    </p>
  )
}

export default App;