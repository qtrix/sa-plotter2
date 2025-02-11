import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes],{ basename: '/sa-plotter2' });

export default router;
