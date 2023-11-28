
const jwt = require('jsonwebtoken');
const {pool} = require('../config/db');


const authenticate = async (username, password) => {
    try {
        
        const [userData, fields] = await pool.query(`
            SELECT * 
            FROM users
            WHERE username = ?`,
            [username]
        );
        
            const isValid = password === userData[0].password

            return isValid ? userData[0] : null;

    } catch (error) {
        console.error('Error during user authentication:', error);
        throw error;
    }
}

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check the user credentials 
        const authenticatedUser = await authenticate(username, password)

        if(authenticatedUser) {
            const roles = await pool.query(`
                SELECT role
                FROM users
                WHERE username = ?`
                ,[ authenticatedUser.username ])

             // jwt token
             const accessToken = jwt.sign(
                { username: authenticatedUser.username, role : [roles[0][0].role], id: authenticatedUser.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30sec', algorithm: 'HS256' }
            );
            
            const refreshToken = jwt.sign(
                { username: authenticatedUser.username, id: authenticatedUser.id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d', algorithm: 'HS256' }
            );

            // save the refresh token with current user in the database
            await pool.query(`
                UPDATE users
                SET refreshToken = ?
                WHERE id = ?`
                 ,[ refreshToken, authenticatedUser.id ]
            );

            // Set the refresh token as a cookie on the response
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
            res.json({ username : authenticatedUser.username, role : [roles[0][0].role], id: authenticatedUser.id, accessToken });

            } else {
               res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

module.exports = {
    handleLogin
}




