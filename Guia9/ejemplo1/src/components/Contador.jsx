import { useState, useEffect } from "react";

const Contador = () => {
    const [count, setCount] = useState(0);

    const addCount = () => {
        setCount(count + 1);
    }

    useEffect(() => {
        console.log("Carga inicial");
    })

    useEffect(() => {
        //effect
        document.title = `${count} contador`;
    }, [count]);

    return (
        <>
            <h3>Contador</h3>
            <h4>{count}</h4>
            <button onClick={addCount}>Sumar +1</button>
        </>
    )
}

export default Contador;