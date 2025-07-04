import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutContext from "../hooks/useWorkoutContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

function Home() {
    const { workouts, dispatch } = useWorkoutContext();
    // Before global context
    // const [workouts, setWorkouts] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts/', {
                headers: { "Authorization": `Bearer ${user.token}` }
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: data });
            }
        }
        fetchWorkout();
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {!workouts && <h2>Loading...</h2>}
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout} />)
                )}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;
