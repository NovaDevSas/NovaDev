import React from 'react';
import '../styles/habitWorld.css';
import forestBg from '../images/forest_bg.png';
import cityBg from '../images/city_bg.png';
import oceanBg from '../images/ocean_bg.png';

const HabitWorld = ({ habitType }) => {
    let worldImage;
    switch (habitType) {
        case 'vida saludable':
            worldImage = forestBg;
            break;
        case 'productividad':
            worldImage = cityBg;
            break;
        case 'relajación':
            worldImage = oceanBg;
            break;
        default:
            worldImage = forestBg;
    }

    return (
        <div className="habit-world" style={{ backgroundImage: `url(${worldImage})` }}>
            <h2>Entorno de Hábito: {habitType}</h2>
        </div>
    );
};

export default HabitWorld;