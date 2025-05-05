import React from 'react'
import Footer from '../components/Navigation/AuthFooter';
import { Outlet } from 'react-router';

const AuthLayout: React.FC = () => {
    return (
        <div>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default AuthLayout;