const { validateToken } = require("../utils/jwt-manager");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // "Bearer token"
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(401);
    }

    const TOKEN_IS_VALID = validateToken(token);

    if(!TOKEN_IS_VALID) {
        return res.sendStatus(403);
    }

    next();
};

module.exports = { authenticateToken };