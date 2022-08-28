import "./TableStyles.css";
import TableBody from './TableBody';

const usuarios = [
    {
        id: 1,
        nombres: "Tony",
        apellidos: "Stark",
        edad: 48
    },
    {
        id: 2,
        nombres: "Steve",
        apellidos: "Rogers",
        edad: 100
    },
    {
        id: 3,
        nombres: "Natasha",
        apellidos: "Romanoff",
        edad: 35
    },
    {
        id: 4,
        nombres: "Peter",
        apellidos: "Parker",
        edad: 16
    },
    {
        id: 5,
        nombres: "Stephen",
        apellidos: "Strange",
        edad: 40
    }
];

const vacio = [];

const Table = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Edad</th>
                </tr>
            </thead>
            <TableBody usuarios={usuarios} />
        </table>
    );
}

export default Table;