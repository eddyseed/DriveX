import React from 'react'
import Navbar from '../components/Navigation/AuthNavbar';
import Footer from '../components/Navigation/AuthFooter';
import { Outlet } from 'react-router';

const AuthLayout: React.FC = () => {
    return (
        <div>
            {/* <Navbar/> */}
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default AuthLayout;