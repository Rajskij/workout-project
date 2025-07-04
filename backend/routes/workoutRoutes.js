import express from 'express';
import { getAllWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } from '../controller/workoutController.js';
import validateAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.use(validateAuth);

router
    .route('/')
    .get(getAllWorkouts)
    .post(createWorkout);

router
    .route('/:id')
    .get(getWorkout)
    .patch(updateWorkout)
    .delete(deleteWorkout);


export default router;
