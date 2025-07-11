import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

async function validateAuth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id: _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(_id);
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

export default validateAuth;
