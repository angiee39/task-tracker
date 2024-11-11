const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    // TOKEN SEND VIA HEADERS *********
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Bearer token
    //
    // if (!token) {
    //     return res.sendStatus(401); // Unauthorized
    // }
    //
    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err) {
    //         return res.sendStatus(403); // Forbidden
    //     }
    //
    //     req.user = user;
    //     next();
    // });

    // TOKEN SEND VIA COOKIES *********
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden');
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
