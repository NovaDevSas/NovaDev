import React, { useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/editProfile.css';

const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSave = () => {
        // Simulación de actualización del usuario en localStorage (aquí podrías integrar la API para actualizar en la base de datos)
        const updatedUser = { ...user, username, email };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Perfil actualizado correctamente');
        navigate('/profile');
    };

    return (
        <>
            <BaseLayout title="Editar Perfil">
                <div className="edit-profile-container">
                    <div className="edit-profile-header">
                        <h2>Editar Perfil</h2>
                    </div>
                    <div className="edit-profile-form">
                        <label>Nombre de Usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Contraseña Nueva:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Dejar en blanco si no se desea cambiar"
                        />

                        <button className="save-profile-button" onClick={handleSave}>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </BaseLayout>
            <Navbar />
        </>
    );
};

export default EditProfile;
