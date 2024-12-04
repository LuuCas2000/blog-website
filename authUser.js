import jwt from 'jsonwebtoken';

const verifyUserRole = (...role) => {
    return (req, res, next) => {
        const accessToken = req.cookies['access-token'];
        const validToken = jwt.verify(accessToken, process.env.JWT_SECRET);

        validToken.roles.some(item => {
            if (role.includes(item)) {
                return next()
            } else {
                res.redirect('/');
            }
        });
    };
};

export default verifyUserRole;