const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const refreshTokenHandler = async (refreshToken, res) => {
    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const [userData, fields] = await pool.query(`
            SELECT * 
            FROM users
            WHERE username = ? AND id = ?`,
            [user.username, user.id]
        );

        if (userData.length > 0) {
            const accessToken = jwt.sign(
                { username: userData[0].username, role: [userData[0].role], id: userData[0].id },
                process.env.ACCESS_TOKEN_SECRET,
                // Adjust expiration time as needed
                { expiresIn: '15m' }
            );

            return res.json({
                username: userData[0].username, 
                role: [userData[0].role], 
                id: userData[0].id, accessToken 
            });
        }

        return res.sendStatus(401);
    } catch (error) {
        console.error('Error during token refresh:', error.message);
        return res.sendStatus(500);
    }
};

const handlerefreshToken = async (req, res) => {

    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(401);

        const refreshToken = cookies.jwt;
        return await refreshTokenHandler(refreshToken, res);
    } catch (error) {
        console.error('Error during token refresh:', error.message);
        return res.sendStatus(500);
    }
};


module.exports = {
    handlerefreshToken
};


