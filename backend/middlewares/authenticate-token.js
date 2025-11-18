const { validateToken } = require("../utils/jwt-manager");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // "Bearer token"
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: 'Token not provided.' });
    }

    const TOKEN_IS_VALID = validateToken(token);

    if(!TOKEN_IS_VALID) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    
    req.username = jwt.decode(token).username;
    next();
};

module.exports = { authenticateToken };