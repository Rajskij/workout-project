import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";

export default function useSignin() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    async function signup(email, password) {
        setError(null);
        setIsLoading(true);

        const response = await fetch('/users/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })
        } else {
            setError(json.error);
        }
        setIsLoading(false);
    }

    return { signup, error, isLoading };
}