import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = Boolean(localStorage.getItem('token'));

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
            window.location.reload();
        }
    };

    return (
        <footer className="neomorph-footer">
            {isAuthenticated && (
                <div className="navbar-icons">
                    <Link to="/" className="navbar-link" aria-label="Inicio">
                        <AiOutlineHome className="navbar-icon" title="Inicio" />
                    </Link>
                    <Link to="/profile" className="navbar-link" aria-label="Perfil">
                        <AiOutlineUser className="navbar-icon" title="Perfil" />
                    </Link>
                    <button onClick={handleLogout} className="navbar-link" aria-label="Cerrar Sesión">
                        <AiOutlineLogout className="navbar-icon" title="Cerrar Sesión" />
                    </button>
                </div>
            )}
        </footer>
    );
};

export default Navbar;