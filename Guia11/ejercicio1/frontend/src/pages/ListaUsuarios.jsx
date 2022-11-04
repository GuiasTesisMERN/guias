import React, { useState, useEffect, useContext } from 'react';

import { getAllUsers } from '../API/user';
import { UserContext } from './../Context/UserContext';

import SimpleTable from '../components/SimpleTable';

const ListaUsuarios = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllUsers(user?.token)
            .then((res) => {
                setData({...res.data});
            });
    }, [user]);

  return (
    <>
        <SimpleTable datos={data.usuarios} cabeceras={["ID", "Nombres", "Apellidos", "Email"]} />
    </>
  )
}

export default ListaUsuarios