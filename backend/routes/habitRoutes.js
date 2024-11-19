const express = require('express');
const {
    createHabit,
    getHabits,
    updateHabit,
    deleteHabit,
    updateHabitWorld
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas para los hábitos
router.route('/').post(protect, createHabit).get(protect, getHabits);
router.route('/:id').put(protect, updateHabit).delete(protect, deleteHabit);
router.put('/:id/world', protect, updateHabitWorld);

module.exports = router;