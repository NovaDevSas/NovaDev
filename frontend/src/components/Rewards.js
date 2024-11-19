import React from 'react';
import '../styles/rewards.css';

const Rewards = ({ points, onRedeem }) => {
    return (
        <div className="rewards-container neomorph">
            <h2>Sistema de Recompensas</h2>
            <p>Puntos Disponibles: {points}</p>
            <button onClick={onRedeem} className="neomorph-button">
                Canjear Recompensa (100 Puntos)
            </button>
        </div>
    );
};

export default Rewards;
