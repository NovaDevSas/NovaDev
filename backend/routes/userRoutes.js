const express = require('express');
const { check, validationResult } = require('express-validator');
const {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para registrar un usuario con validación
router.post(
    '/register',
    [
        check('email', 'Por favor incluya un email válido').isEmail(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        registerUser(req, res);
    }
);

// Rutas para autenticación y perfil de usuario
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;