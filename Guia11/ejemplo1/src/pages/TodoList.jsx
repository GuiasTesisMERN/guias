import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const tareas = [
    {
        id: 1,
        titulo: "tarea 1",
        descripcion: "descripcion 1 de la tareas",
        fecha_creacion: "11-10-22",
        finalizada: false
    },
    {
        id: 2,
        titulo: "tarea 2",
        descripcion: "descripcion 2 de la tareas",
        fecha_creacion: "11-10-22",
        finalizada: false
    },
    {
        id: 3,
        titulo: "tarea 3",
        descripcion: "descripcion 3 de la tareas",
        fecha_creacion: "11-10-22",
        finalizada: true
    },
];

const TodoList = () => {
    const { id } = useParams();
    const [tarea, setTarea] = useState(null);

    useEffect(() => {
        setTarea(() => {
            return tareas.find(t => t.id == id);
        })
    }, [id]);

  return (
    <>
        {
            tarea ? (
                <div>
                    {tarea.id}
                </div>
            ) : (
                <div>
                    No existe esta tarea.
                </div>
            )
        }
    </>
  )
}

export default TodoList