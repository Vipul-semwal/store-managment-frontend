import { useRoutes } from 'react-router-dom';

// project import
import AuthRoutes from './LoginRoutes';
import DasboarRoutes from './DasBoardRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function Routing() {
    return useRoutes([AuthRoutes, DasboarRoutes]);
}
