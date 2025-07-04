import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const salt = 10;

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

schema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All field requires');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('User doesn\'t exist');
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user;
};

schema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be field");
    }
    if (!validator.isEmail(email)) {
        throw Error('Not Email');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is to week');
    }

    const user = await this.findOne({ email });
    if (user) {
        throw Error('Email already in use');
    }


    const encryptedPassword = await bcrypt.hash(password, salt);
    const result = await this.create({ email, password: encryptedPassword });

    return result;
}

export default mongoose.model('User', schema);
