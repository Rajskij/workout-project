import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

function createToken(id) {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' });
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function createUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.signup(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
