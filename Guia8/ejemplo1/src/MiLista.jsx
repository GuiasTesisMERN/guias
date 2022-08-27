const MiLista = (props) => {
    return(
        <ul>
        {props.tareas.map((tarea, key) => {
            return (
                <li key={key}>{tarea.id} {tarea.titulo}</li>
            )
        })}
        </ul>
    )
}

export default MiLista;