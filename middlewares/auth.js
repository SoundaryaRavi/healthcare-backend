const jwt = require('jsonwebtoken');

export const checkUserAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send('Access Denied');
        }
        const user = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject('Invalid Token');
                } else {
                    resolve(decoded);
                }
            });
        });

        if (user) req.user = user;
        next();
    } catch (error) {
        return res.status(403).send(error);
    }
}