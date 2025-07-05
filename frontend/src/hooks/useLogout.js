import { useAuthContext } from "./useAuthContext.js";
import useWorkoutContext from "./useWorkoutContext.js";

export default function useLogout() {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutContext();

    function logout() {
        localStorage.clear('user');
        dispatch({ type: 'LOGOUT' });
        workoutDispatch({ type: 'SET_WORKOUTS', payload: [] })
    }

    return { logout };
}
