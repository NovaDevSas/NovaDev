import axios from 'axios';

// URL base para tu API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Registrar usuario
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error.response.data;
    }
};

// Iniciar sesión
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error.response.data;
    }
};

// Obtener hábitos
export const getHabits = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/habits`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener hábitos:', error);
        throw error.response.data;
    }
};

// Crear hábito
export const createHabit = async (habitData, token) => {
    try {
        const response = await axios.post(`${API_URL}/habits`, habitData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el hábito:', error);
        throw error.response.data;
    }
};

// Completar hábito
export const completeHabit = async (id, token) => {
    try {
        const response = await axios.put(`${API_URL}/habits/${id}/complete`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error al completar el hábito:', error);
        throw error.response.data;
    }
};

// Actualizar el mundo del hábito
export const updateHabitWorld = async (habitId, updatedData, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/habits/${habitId}`,
            updatedData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el mundo del hábito:', error);
        throw error.response?.data || error.message;
    }
};
