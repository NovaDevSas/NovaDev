import React from 'react';
import { updateHabitWorld } from '../services/api'; // Importación correcta
import '../styles/mobile.css';

const HabitCard = ({ habit, token, onHabitUpdated }) => {
    const handleUpdateWorld = async () => {
        try {
            await updateHabitWorld(habit._id, { world: habit.world + 1 }, token);
            onHabitUpdated();
        } catch (error) {
            console.error('Error al actualizar el mundo del hábito:', error);
            alert('Hubo un problema actualizando el mundo del hábito. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="habit-card">
            <h3>{habit.name}</h3>
            <p>{habit.description}</p>
            <button onClick={handleUpdateWorld} className="neomorph-button">
                Actualizar Mundo
            </button>
        </div>
    );
};

export default HabitCard;
