import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import './styles/mobile.css';
import './styles/Navbar.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsAuthenticated(Boolean(localStorage.getItem('token')));
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div className="loading-screen">Cargando...</div>;
    }

    return (
        <Router>
            <div className="app-content">
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/edit-profile" element={<EditProfile />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
            {isAuthenticated && <Navbar />} {/* Navbar se muestra solo si está autenticado */}
        </Router>
    );
};

export default App;
