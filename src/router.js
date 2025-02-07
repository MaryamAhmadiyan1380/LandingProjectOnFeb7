
import { createBrowserRouter } from 'react-router-dom'
import MainPage from './Components/MainPage'
import Home from './Components/ProductNavbar/Home'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import ProductsCategories from './Components/ProductNavbar/ProductaCategories';
import ManagementCategories from './Components/ProductNavbar/ManagementCategories';
import ManagementProducts from './Components/ProductNavbar/ManagementProducts';
import AboutMe from './Components/ProductNavbar/AboutMe';
import CommunicationWithUs from './Components/ProductNavbar/CommunicationWithUs';
import LoginAndSignUp from './Components/LoginPage/LoginAndSignUp';
import Login from './Components/LoginPage/Login';
import SignUp from './Components/LoginPage/SignUp';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
const router = createBrowserRouter([
    {
        path: "/mainpage",
        element: <MainPage />
    },
    {
        path: "/",
        element: <ProtectedRoute element={<Home />} />
    },

    {
        path: "/productscategories",
        element: <ProtectedRoute element={<ProductsCategories />} />
    }
    ,
    {
        path: '/managementcategories',
        element: <ProtectedRoute element={<ManagementCategories />} />
    },
    {
        path: '/managementproducts',
        element: <ProtectedRoute element={<ManagementProducts />} />
    },
    {
        path: '/aboutme',
        element: <ProtectedRoute element={<AboutMe />} />
    },
    {
        path: '/communicationwithus',
        element: <ProtectedRoute element={<CommunicationWithUs />} />
    },
    {
        path: '/loginandsignup',
        element: <LoginAndSignUp />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '*',
        element: <NotFoundPage />
    },

])

export default router;