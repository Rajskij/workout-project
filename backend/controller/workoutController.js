import workoutModel from "../model/workoutModel.js";
import mongoose from "mongoose";

async function getAllWorkouts(req, res) {
    const workouts = await workoutModel.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
}

async function getWorkout(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' })
    }

    const workout = await workoutModel.findById(id);

    if (!workout) {
        return res.status(404).json('No such workout');
    }
    res.status(200).json(workout);
}

async function createWorkout(req, res) {
    const { title, load, reps } = req.body;
    const emptyFields = [];
    
    !title && emptyFields.push('title');
    !load && emptyFields.push('load');
    !reps && emptyFields.push('reps');
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        const workout = await workoutModel.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

async function deleteWorkout(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' })
    }

    const workout = await workoutModel.findOneAndDelete({ _id: id });

    if (!workout) {
        return res.status(404).json('No such workout');
    }
    res.status(200).json(workout);
}

async function updateWorkout(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' })
    }

    const workout = await workoutModel.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!workout) {
        return res.status(404).json('No such workout');
    }
    res.status(200).json(workout);
}

export {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
