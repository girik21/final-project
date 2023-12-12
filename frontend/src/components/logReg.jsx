import { useState } from "react"
import axios from "axios"
import '../styles/login.css'
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post("https://127.0.0.1:8080/auth/login", { username, password });
            
            setCookies("access_token", result.data.token);

            window.localStorage.setItem("userID", result.data.userID)
            navigate("/");
        } catch (error) {
            console.log(error)
            alert("Wrong Credentials. Please check your email and password")
        }
    }

    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label={"Login"}
            onSubmit={onSubmit}
            className="form" />
    )
}

export const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await axios.post("https://127.0.0.1:8080/auth/register", { username, password, confirmPassword });
            alert("Registration Completed")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            label={"Register"}
            onSubmit={onSubmit} 
            className="form"/>
    )
}

const Form = ({ username, setUsername, password, setPassword, label, onSubmit, confirmPassword, setConfirmPassword }) => {
    return (
        <div className="container">
            <div className="auth-container">
                <form onSubmit={onSubmit}>
                    <h2>{label}</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    {label === "Register" && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password: </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                    )}
                    <button type="submit"> {label}</button>
                </form>
            </div>
        </div>
    )

}