const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Comprobar si el token está a punto de expirar y emitir uno nuevo si es necesario
            if (Date.now() >= decoded.exp * 1000 - 5 * 60 * 1000) {
                token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
                res.setHeader('Authorization', `Bearer ${token}`);
            }

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };