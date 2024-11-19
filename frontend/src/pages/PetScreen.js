import React from 'react';
import BaseLayout from '../components/BaseLayout';
import Navbar from '../components/Navbar';
import '../styles/mobile.css';
import petHealthy from '../images/pet/pet_healthy.png';
import petUnhealthy from '../images/pet/pet_unhealthy.png';

const PetScreen = ({ petHealth = 100 }) => {
    const healthPercentage = `${petHealth}%`;
    const petImage = petHealth === 100 ? petHealthy : petUnhealthy;

    return (
        <>
            <BaseLayout title="Salud de la Mascota">
                <div className="pet-content">
                    <img src={petImage} alt="Mascota" className="pet-image" />
                    
                    {/* Contenedor de la barra de salud */}
                    <div className="health-bar-container">
                        <div 
                            className="health-bar" 
                            style={{ width: healthPercentage }}
                        />
                    </div>

                    <p className="health-label">{healthPercentage} Salud</p>
                    {petHealth < 50 && <p style={{ color: 'red' }}>La salud de tu mascota está baja, ¡cuídala mejor!</p>}
                </div>
            </BaseLayout>
            <Navbar />
        </>
    );
};

export default PetScreen;