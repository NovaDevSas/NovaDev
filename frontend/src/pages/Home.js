import React, { useEffect, useState } from 'react';
import HabitCard from '../components/HabitCard';
import Rewards from '../components/Rewards';
import VirtualPet from '../components/VirtualPet';
import ProgressTree from '../components/ProgressTree';
import { getHabits, createHabit } from '../services/api';

const Home = ({ token }) => {
    const [habits, setHabits] = useState([]);
    const [points, setPoints] = useState(0);
    const [petHealth, setPetHealth] = useState(100);
    const [isLoading, setIsLoading] = useState(false);

    const fetchHabits = async () => {
        setIsLoading(true);
        try {
            const habitsData = await getHabits(token);
            setHabits(habitsData);
        } catch (error) {
            console.error('Error al obtener los hábitos:', error);
            alert('Hubo un problema obteniendo los hábitos.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchHabits();
        }
    }, [token]);

    const handleCreateHabit = async () => {
        if (habits.some(habit => habit.name === 'Nuevo hábito')) {
            alert('Este hábito ya existe.');
            return;
        }

        try {
            const newHabit = { name: 'Nuevo hábito', description: 'Descripción del hábito' };
            await createHabit(newHabit, token);
            fetchHabits();
        } catch (error) {
            console.error('Error al crear el hábito:', error);
            alert('Hubo un problema creando el hábito.');
        }
    };

    return (
        <div className="page-content">
            <h1>Bienvenido a Tu App de Hábitos</h1>
            <Rewards points={points} onRedeem={() => setPoints(points - 100)} />
            <VirtualPet petHealth={petHealth} />
            <button onClick={handleCreateHabit} className="neomorph-button">Crear Hábito</button>
            {isLoading ? <p>Cargando hábitos...</p> : (
                <div>
                    {habits.map(habit => (
                        <HabitCard
                            key={habit._id}
                            habit={habit}
                            token={token}
                            onHabitUpdated={fetchHabits}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;