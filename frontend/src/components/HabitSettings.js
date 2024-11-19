import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/habitSettings.css';

const HabitSettings = ({ onSaveSettings }) => {
    const [habitName, setHabitName] = useState('');
    const [reminder, setReminder] = useState(new Date());
    const [goal, setGoal] = useState('');

    const handleSave = () => {
        onSaveSettings({ habitName, reminder, goal });
    };

    return (
        <div className="habit-settings neomorph">
            <h2>Configuración de Hábito</h2>
            <label>Nombre del Hábito:</label>
            <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Ej. Beber agua"
            />

            <label>Recordatorio:</label>
            <DatePicker
                selected={reminder}
                onChange={(date) => setReminder(date)}
                showTimeSelect
                dateFormat="Pp"
            />

            <label>Meta:</label>
            <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Ej. 8 vasos diarios"
            />

            <button onClick={handleSave} className="neomorph-button">
                Guardar Configuración
            </button>
        </div>
    );
};

export default HabitSettings;
