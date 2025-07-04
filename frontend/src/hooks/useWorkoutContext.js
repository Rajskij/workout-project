import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext.js";

export default function useWorkoutContext() {
    const context = useContext(WorkoutsContext);

    if (!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider');
    }

    return context;
}
