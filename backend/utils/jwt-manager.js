const jwt = require('jsonwebtoken');

const SECRET_KEY = 'CURSO_ANGULAR';

const generateTokenOnLogin = (username) => {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: 100 });
};

const validateToken = (token) => {
    let TOKEN_IS_VALID = false;

    try {
        if(!token) {
            throw new Error('Empty token.');
        }

        jwt.verify(token, SECRET_KEY);

        TOKEN_IS_VALID = true;
    } catch (error) {
        TOKEN_IS_VALID = false;
    }

    return TOKEN_IS_VALID;
};

module.exports = { generateTokenOnLogin, validateToken };

