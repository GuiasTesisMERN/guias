const TableBody = ({ usuarios }) => {
    
    if(!usuarios || usuarios.length === 0) {
        return (
            <tbody>
                <tr>
                    <td className="no-data" colSpan={4}>No se han encotrado usuarios registrados.</td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody>
            {
                usuarios?.map((usuario, key) => (
                    <tr key={key}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nombres}</td>
                        <td>{usuario.apellidos}</td>
                        <td>{usuario.edad}</td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default TableBody;