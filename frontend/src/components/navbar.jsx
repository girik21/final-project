import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }

    return (
        <div className="navbar">
            <div className="navbar-title">LORDS</div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/create">Create</Link>
                {!cookies.access_token ? (
                    <Link to="/auth">Login/Register</Link>
                ) : (
                    <Link to="/auth" onClick={logout}>Logout</Link>
                )}
            </div>
        </div>
    );
};

