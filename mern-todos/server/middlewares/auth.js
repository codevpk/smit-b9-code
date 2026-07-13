const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided.", isError: true });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Make the user data available to the next middleware/controller
        req.user = decoded

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token.", isError: true })
    }
}

module.exports = { verifyUser }