import React from 'react';
import BaseLayout from '../components/BaseLayout';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    return (
        <>
            <BaseLayout title={`Perfil de ${user?.username || 'Usuario'}`}>
                <div className="profile-container">
                    <div className="profile-header">
                        <h2>Perfil de {user?.username || 'Usuario'}</h2>
                    </div>
                    <div className="profile-info">
                        <div className="profile-info-item">
                            <label>Email:</label>
                            <p>{user?.email || 'No disponible'}</p>
                        </div>
                        <div className="profile-info-item">
                            <label>Rango:</label>
                            <p>{user?.rank || 'Sin rango'}</p>
                        </div>
                        <div className="profile-info-item">
                            <label>Puntos:</label>
                            <p>{user?.points || 0}</p>
                        </div>
                    </div>
                    <button className="edit-profile-button" onClick={() => navigate('/edit-profile')}>
                        Editar Perfil
                    </button>
                    <button className="edit-profile-button" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </BaseLayout>
            <Navbar />
        </>
    );
};

export default Profile;