import React from 'react'
import { Routes, Route } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import Product from '../pages/Products/ProductPage'
import NotFoundPage from '../pages/NotFound'
import LoginPage from '../pages/Auth/LoginPage'
import SignUpPage from '../pages/Auth/SignUpPage'
import { MenuProvider } from '../context/MenuContext'
import AuthLayout from '../layouts/AuthLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import ProtectedRoutes from './ProtectedRoutes'
import SellUsedCar from '../pages/TradeForms/SellUsedCar'
const AppRoutes: React.FC = () => {
    return (
        <div>
            <Routes>


                <Route path='/' element={
                    <MenuProvider>
                        <MainLayout />
                    </MenuProvider>
                }>
                    <Route index element={<Home />}></Route>
                    <Route path='/user/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}></Route>
                    <Route path='/cars/sell' element={<ProtectedRoutes><SellUsedCar /></ProtectedRoutes>}></Route>
                </Route>
                <Route path='/' element={<AuthLayout />}>
                    <Route path='/user/login' element={<LoginPage />}></Route>
                    <Route path='/user/signup' element={<SignUpPage />}></Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default AppRoutes 
