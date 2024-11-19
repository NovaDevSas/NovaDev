const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    progress: { type: Number, default: 0 }, // Progreso en porcentaje
    world: { type: String, default: 'forest' }, // Mundo temático
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Habit', habitSchema);
