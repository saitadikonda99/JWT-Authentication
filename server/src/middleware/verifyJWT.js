
const jwt = require('jsonwebtoken');

const verifyJWT = async(req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader) {
        return res.status(401).json({ error: 'Missing authorization header' });
    }   
    const token = authHeader.split(' ')[1];
    
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => { 
            if(err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user;
            req.role = user.role;
            next();
        }
    )
}

module.exports = verifyJWT;


