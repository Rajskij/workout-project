import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

function WorkoutForm() {
    const defaultWorkout = {
        title: '',
        load: '',
        reps: ''
    };

    const { dispatch } = useWorkoutContext();
    const [workout, setWorkout] = useState(defaultWorkout);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { user } = useAuthContext();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!user) {
            setError('User should be authorized');
            return;
        }

        e.preventDefault();
        try {
            const response = await fetch('api/workouts/', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if (response.ok) {
                setError(null);
                dispatch({ type: 'CREATE_WORKOUT', payload: json });
                setWorkout(defaultWorkout);
                setEmptyFields([]);
            } else {
                setError(json.error);
                setEmptyFields(json.emptyFields);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleChange(e) {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h1>Create Workout</h1>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={handleChange}
                name="title"
                value={workout.title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load in (kg):</label>
            <input
                type="text"
                onChange={handleChange}
                name="load"
                value={workout.load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="text"
                onChange={handleChange}
                name="reps"
                value={workout.reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default WorkoutForm;