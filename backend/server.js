import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import workoutRoutes from './routes/workoutRoutes.js';
import oauthRoutes from './routes/authRoutes.js'

const app = express();
dotenv.config();
try {
    await mongoose.connect(process.env.MONGO_URI);
} catch (err) {
    console.error(err.message, process.env.MONGO_URI);
}

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/workouts', workoutRoutes);
app.use('/users', oauthRoutes);

app.listen(process.env.PORT, () => {
    console.log('server running on port: ', process.env.PORT);
});
