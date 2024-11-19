import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../styles/mobile.css'; // Asegúrate de tener el CSS correcto importado

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };

        try {
            setIsSubmitting(true);
            const data = await loginUser(userData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
            window.location.reload();
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al iniciar sesión';
            setError(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="neomorph-form">
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
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
                    {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
                <p>¿No tienes una cuenta? <Link to="/register" className="link-text">Regístrate aquí</Link></p>
            </form>
        </div>
    );
};

export default Login;