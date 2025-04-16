import React from "react";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Navigation/Footer";
import { Outlet } from "react-router";
const MainLayout: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
