import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Body</h1>
                </Link>
                <nav>
                    {user && (
                        <div className="logout">
                            {user.email}
                            <button onClick={() => logout()}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;