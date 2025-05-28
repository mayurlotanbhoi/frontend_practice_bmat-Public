import { createBrowserRouter } from 'react-router-dom';

// Assuming you have a Layout wrapper

import { AppLayout } from '../layout';
import Home from '../views/home/Home';
import SignSinup from '../views/auth/SignSinup';
import PrivateOutlet from './PriveteOutlet';


const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateOutlet><AppLayout /></PrivateOutlet> ,
        children: [
            { index: true, element: <Home /> },
            // { path: '/home', element: <Home /> },
            // { path: 'checkout', element: <Checkout /> },
        ]
    },
    {
        path: '/auth',
        element: <SignSinup />,
       
    },
    // {
    //     path: 'auth',
    //     children: [
    //         { path: 'auth-location', element: <AuthLocation /> },
    //         { path: 'loading-screen', element: <LoadingScreen /> },
    //         { path: '/auth', element: <NewAuth /> }
    //     ]
    // },
    // {
    //     path: '*',
    //     element: <Maintenance />
    // }
]);
export default router;
