import React, { useEffect, useContext } from 'react';

import { Navigate } from "react-router-dom";

import { UserContext } from '../Context/UserContext';

const PrivateRoute = ({children}) => {
    const { user, logout } = useContext(UserContext);

    useEffect(() => {
      if(!user.estado) {
        logout();
      }
    }, [user, logout]);
  
    return (
      <>
        {user?.estado ? children : <Navigate to="/login" replace />}
      </>
    )
}

export default PrivateRoute;
