import UsuarioAutenticado from "./UsuarioAutenticado";
import UsuarioInvitado from './UsuarioInvitado';

const Bienvenido = ({ estaLogeado }) => {

    if(estaLogeado) {
        return <UsuarioAutenticado name="Jose" />
    }

    return <UsuarioInvitado />
}

export default Bienvenido;