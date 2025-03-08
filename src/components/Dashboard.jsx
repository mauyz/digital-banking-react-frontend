import React, { useEffect } from 'react'
import { NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { decodeJwt, decodeRole, decodeUsername, logout } from '../app/app';
import Home from './Home';
import Register from './Register';

export default function Dashboard() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const payload = decodeJwt(accessToken);
    const roles = decodeRole(payload);
    const isAdmin = roles?.includes("ADMIN");
    const username = decodeUsername(payload);
    console.log(isAdmin);

    useEffect(
        () => {
            if (!accessToken) {
                navigate("/login");
            }
        },
        [accessToken, navigate]
    );

    const handleLogout = () => {
        logout();
        navigate("/login");

    }

    return (
        <div className='p-2 m-2'>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse' id="navbarSupportedContent">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to="/" end>
                                    Home
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to="/register" end>
                                    Add customer
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to="/history">
                                    History
                                </NavLink>
                            </li>

                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className='nav-item dropdown'>
                                <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {username}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path='*' element={<Outlet />} >
                    <Route index element={<Home />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </div>
    )
}
