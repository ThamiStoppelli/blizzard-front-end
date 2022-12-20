import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Login from "./Pages/Login";
import AboutSystem from './Pages/AboutSystem';
import AboutSystemLoggedIn from './Pages/AboutSystemLoggedIn';
import SignUp from './Pages/SignUp';
import PasswordRecovery from './Pages/PasswordRecovery';
import PasswordReset from './Pages/PasswordReset';
import Dashboard from './Pages/Dashboard';
import Devices from './Pages/Devices';
import Groups from './Pages/Groups';
import Users from './Pages/Users';

import GroupSpaces from './Pages/GroupSpaces';

import { AuthProvider, AuthContext } from "./contexts/auth";

const Paths = () => {

  const token = localStorage.getItem("token");
  const typeUser = localStorage.getItem("typeUser");

  const navigate = useNavigate()

  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if(loading) {
      return <div className="loading">Carregando...</div>;
    }
    if(!authenticated) {
      return <Navigate to="/" />;
    }
    return children;
  }

  // useEffect(()=> {
  //   if(!token){ navigate("/")}
  // }, [token])

  // (typeUser == 0 || typeUser == 1) ? <Navigate to="/dashboard" /> :
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={ !!token ? <Navigate to="/dashboard" /> :  <Login />} />
        <Route path="/cadastrar" element={ !!token ? <Navigate to="/dashboard" /> :  <SignUp />} />
        <Route path="/senha/recuperar" element={ !!token ? <Navigate to="/dashboard" /> : <PasswordRecovery />} />
        <Route path="/sobre" element={ !!token ? <Navigate to="/dashboard" /> : <AboutSystem />} />

        <Route path="/senha/alterar" element={<PasswordReset />} /> 
        {/* private? */}

        <Route path="/sobre/autenticado" element={<Private> <AboutSystemLoggedIn /> </Private>} />
        <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} />
        <Route path="/aparelhos" element={<Private> <Devices /> </Private>} />
        <Route path="/grupos" element={(typeUser == 0 || typeUser == 1) ? <Groups /> : <Navigate to="/dashboard" /> } />
        <Route path="/usuarios" element={(typeUser == 0 || typeUser == 1) ? <Users /> : <Navigate to="/dashboard" /> } />

        <Route path="/grupos/espacos" element={(typeUser == 0 || typeUser == 1) ? <GroupSpaces /> : <Navigate to="/dashboard" />} />

        
        <Route path="*" element={ !!token ? <Navigate to="/dashboard" /> : <Navigate to="/" /> } />

      </Routes>
    </AuthProvider>
  );
}

export default Paths;

//adicionar controle de rotas privadas e rotas publicas

// <BrowserRouter>
// <Routes>
//   <Route path="/" element={<App />} />
//   <Route path="expenses" element={<Expenses />} />
//   <Route path="invoices" element={<Invoices />} />
//  <Route path="/login" element={user ? <Navigate to="/" replace /> :  <Login />}  />
// </Routes>
// </BrowserRouter> 

// esse Route com o path = login vai renderizar a página de login ou esse Navigate

// essa condição "user" é pra ser tua verificação se o usuário ta logado ou não, e o to="/" no Navigate eh pra onde tu quer que ele va caso ele esteja logado
