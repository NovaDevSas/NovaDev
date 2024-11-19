const Habit = require('../models/Habit');

// Crear un hábito
exports.createHabit = async (req, res) => {
    try {
        const { name, world, frequency } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'El nombre del hábito es obligatorio' });
        }
        const habit = new Habit({
            user: req.user._id,
            name,
            world,
            frequency
        });

        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        console.error('Error al crear hábito:', error);
        res.status(500).json({ message: 'Error al crear hábito' });
    }
};


// Obtener todos los hábitos del usuario autenticado
exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user._id });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching habits' });
    }
};

// Actualizar un hábito
exports.updateHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findById(id);

        if (habit && habit.user.toString() === req.user._id.toString()) {
            habit.title = req.body.title || habit.title;
            habit.description = req.body.description || habit.description;
            habit.world = req.body.world || habit.world;

            const updatedHabit = await habit.save();
            res.json(updatedHabit);
        } else {
            res.status(404).json({ message: 'Habit not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating habit' });
    }
};

// Eliminar un hábito
exports.deleteHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findById(id);
        if (habit && habit.user.toString() === req.user._id.toString()) {
            await habit.remove();
            res.json({ message: 'Habit deleted' });
        } else {
            res.status(404).json({ message: 'Habit not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting habit' });
    }
};
exports.updateHabitWorld = async (req, res) => {
    const { id } = req.params;
    const { world } = req.body;

    try {
        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ message: 'Hábito no encontrado' });
        }

        habit.world = world;
        await habit.save();
        res.status(200).json(habit);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el mundo del hábito', error });
    }
};

