const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const { user } = req;
        console.log('user:', user);
        // Check if user and user.role are defined before accessing role property
        if (user && user.role && user.role.length > 0) {
            console.log('user:', user.role);

            if (user.role.some(role => allowedRoles.includes(role))) {
                next();
            } else {
                console.log(allowedRoles);
                res.status(401).json({ error: 'Unauthorized' });
            }
        } else {
            // Handle the case where user or user.role is undefined
            res.status(401).json({ error: 'Unauthorized && No user found' });
        }
    };  
} 

module.exports = verifyRoles;
