import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../shared/helpers/user.helper";
import User from "../shared/interfaces/user.interface";

export default function Login({ setUser, setToken }: { setUser: React.Dispatch<React.SetStateAction<User>>, setToken: React.Dispatch<React.SetStateAction<string>> }): ReactElement {
    const [email, setEmail] = useState<String>();
    const [password, setPassword] = useState<String>();

    const navigate = useNavigate();

    function handleSubmit() {
        signIn(email, password, setUser, setToken, navigate);
    }
    return (
        <form name="login" id="login-form" className="container">
            <h3>Login:</h3>
            <fieldset>
                <label htmlFor="email-input">Email:</label>
                <input type="email" name="email" id="email-input" onChange={e => setEmail(e.target.value)} />

                <label htmlFor="password-input">Password:</label>
                <input type="password" name="password" id="password-input" onChange={e => setPassword(e.target.value)} />

                <input type="button" className="btn-prim" value="Login" onClick={handleSubmit} />
            </fieldset>
        </form>
    )
}