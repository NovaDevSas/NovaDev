const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Registro de usuario
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Datos recibidos en el backend:", req.body);

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ username, email, password });

        if (user) {
            console.log("Usuario creado:", user);
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error durante el registro del usuario:', error);
        res.status(500).json({ message: error.message || 'Server error during registration' });
    }
};

// Inicio de sesión
exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Obtener perfil del usuario autenticado
exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            rank: user.rank,
            points: user.points,
            badges: user.badges,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Actualizar perfil del usuario autenticado
exports.updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            rank: updatedUser.rank,
            points: updatedUser.points,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};