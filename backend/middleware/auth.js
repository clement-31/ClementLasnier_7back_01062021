const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const idUser = decodedToken.idUser;
        if (req.body.idUser && req.body.idUser !== idUser) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch(err) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

