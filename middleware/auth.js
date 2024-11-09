const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ code: 403, message: 'No tienes permiso :(' });
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'debugkey');
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ code: 401, message: 'Token no válido o expirado' });
    }
};



