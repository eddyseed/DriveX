const jwt = require('jsonwebtoken');

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }
        try {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Failed to authenticate token' });
                }

                if (!requiredRole.includes(decoded.role) && decoded.role !== 'admin') {
                    return res.status(403).json({ message: 'Insufficient permissions' });
                }
                req.user = decoded;
                next();
            });
        } catch (error) {
            console.error("Error in Token Verification", error)
        }

    };
};
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: 'Please Log In Prior' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = { verifyRole, verifyToken };
    