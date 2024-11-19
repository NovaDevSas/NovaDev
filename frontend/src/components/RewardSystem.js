import React, { useState } from 'react';
import '../styles/rewardSystem.css';

const RewardSystem = ({ initialPoints }) => {
    const [points, setPoints] = useState(initialPoints);
    const [rewards, setRewards] = useState([]);

    const redeemReward = () => {
        if (points >= 10) {
            setPoints(points - 10);
            setRewards([...rewards, 'Recompensa Desbloqueada']);
        } else {
            alert('No tienes suficientes puntos para canjear una recompensa.');
        }
    };

    return (
        <div className="reward-system neomorph">
            <h2>Sistema de Recompensas</h2>
            <p>Puntos Disponibles: {points}</p>
            <button onClick={redeemReward} className="neomorph-button">
                Canjear Recompensa (10 Puntos)
            </button>
            <div className="rewards-list">
                {rewards.map((reward, index) => (
                    <p key={index}>{reward}</p>
                ))}
            </div>
        </div>
    );
};

export default RewardSystem;
