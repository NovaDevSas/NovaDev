import React from 'react';
import '../styles/virtualPet.css';
import petHealthy from '../images/pet/pet_healthy.png';
import petUnhealthy from '../images/pet/pet_unhealthy.png';

const VirtualPet = ({ health }) => {
    const petImage = health > 50 ? petHealthy : petUnhealthy;

    return (
        <div className="virtual-pet">
            <img src={petImage} alt="Mascota Virtual" className="pet-image" />
            <p>Salud: {health}%</p>
            {health < 50 && <p className="warning">Tu mascota necesita atención!</p>}
        </div>
    );
};

export default VirtualPet;
