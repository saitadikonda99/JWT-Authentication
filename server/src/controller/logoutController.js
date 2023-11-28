const { pool } = require('../config/db');

const handleLogout = async (req, res) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) {
            return res.sendStatus(401);
        }

        const refreshToken = cookies.jwt;

// Clear the refresh token in the database (Assuming you have a field named 'refreshToken' in your users table)
        await pool.query(`
            UPDATE users
            SET refreshToken = null
            WHERE refreshToken = ?`,
            [refreshToken]
        );

        // Clear the cookie on the client side
        res.clearCookie('jwt', { httpOnly: true});

        console.log('User logged out successfully');
        return res.sendStatus(200); // Successful logout

    } catch (error) {
        console.error('Error during logout:', error);
        return res.sendStatus(500);
    }

};

module.exports = {
    handleLogout
};


