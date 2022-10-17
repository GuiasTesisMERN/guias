import React, { useContext } from 'react';

import { Navigate } from "react-router-dom";

import { UserContext } from '../Context/UserContext';

const PublicRoute = ({children}) => {
    const { user } = useContext(UserContext);
  
    return (
      <>
        {!user?.auth ? children : <Navigate to="/" replace />}
      </>
    )
  }

export default PublicRoute