import { useAuthContext } from "./useAuthContext.js";

export default function useLogout() {
    const { dispatch } = useAuthContext();

    function logout() {
        localStorage.clear('user');
        dispatch({ type: 'LOGOUT' });
    }

    return { logout };
}
