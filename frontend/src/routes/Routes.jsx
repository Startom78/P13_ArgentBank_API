import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import Homepage from '../pages/Homepage.jsx';
import Login from '../pages/Login.jsx';
import User from '../pages/User.jsx';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },

            {
                path: '/login',
                element: <Login />
            },

            {
                path: '/dashboard',
                element: <User />
            }
        ]
    }
]);

export default router;
