import { useState } from "react";

const Reloj = () => {
    const fecha = new Date();
    const [estado, setEstado] = useState(fecha);

    return (
        <>
            <h3>Hora actual: </h3>
            <h4>{estado.toLocaleTimeString()}</h4>
        </>
    )
}

export default Reloj;