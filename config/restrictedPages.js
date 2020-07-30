const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    let authorizationToken = req.headers.authorization;
    
    if(!authorizationToken) {
        return res.sendStatus(401);
    }
    
    token = authorizationToken.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, 'secret');
        next();
    } catch (error) {
        if(error.message === 'jwt expired') {
            return res.status(403).send({ error: 'token is expired!' });
        }

        if(error.message === 'invalid token') {
            return res.status(401).send({ error: 'Invalid token!' });
        }

        return res.send({ error });
    }
}

module.exports = {
    isAuth
}