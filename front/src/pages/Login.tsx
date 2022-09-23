import axios from "axios";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../shared/interfaces/user.interface";

export default function Login({ setUser, setToken }: { setUser: React.Dispatch<React.SetStateAction<User>>, setToken: React.Dispatch<React.SetStateAction<String>> }): ReactElement {
    const [email, setEmail] = useState<String>();
    const [password, setPassword] = useState<String>();

    const navigate = useNavigate();

    function handleSubmit() {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/users/sign_in`, { "user": { "email": email, "password": password } })
            .then(resp => {
                setUser(resp.data.user);
                setToken(resp.headers.authorization);
                axios.defaults.headers.common["Authorization"] = resp.headers.authorization;
                navigate(`/user/${resp.data.user.id}`);
            })
            .catch(err => console.error(err))
    }
    return (
        <form name="login" id="login-form">
            <label htmlFor="email-input">Email:</label>
            <input type="email" name="email" id="email-input" onChange={e => setEmail(e.target.value)} />

            <label htmlFor="password-input">Password:</label>
            <input type="password" name="password" id="password-input" onChange={e => setPassword(e.target.value)} />

            <input type="button" value="Login" onClick={handleSubmit} />
        </form>
    )
}