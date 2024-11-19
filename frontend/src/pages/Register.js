import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import '../styles/mobile.css'; // Asegúrate de tener el CSS correcto importado

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };

        try {
            setIsSubmitting(true);
            await registerUser(userData);
            navigate('/login');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al registrarse';
            setError(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="neomorph-form">
                <h2>Registrarse</h2>
                {error && <p className="error-message">{error}</p>}
                <input 
                    type="text" 
                    placeholder="Nombre de Usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="neomorph-input"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="neomorph-input"
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="neomorph-input"
                />
                <button type="submit" className="neomorph-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Cargando...' : 'Registrarse'}
                </button>
                <p>¿Ya tienes una cuenta? <Link to="/login" className="link-text">Inicia sesión aquí</Link></p>
            </form>
        </div>
    );
};

export default Register;