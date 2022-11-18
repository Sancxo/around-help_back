import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlashMessageContext, UserContext } from "../shared/context";
import { clearFlash, getFlash } from "../shared/helpers/flash.helper";
import { signIn } from "../shared/helpers/user.helper";
import User from "../shared/interfaces/user.interfaces";

export default function Login({ setToken }: { setUser: React.Dispatch<React.SetStateAction<User>>, setToken: React.Dispatch<React.SetStateAction<string>> }): ReactElement {
    const setFlashMessage = useContext(FlashMessageContext).setFlashMessage;
    const setUser = useContext(UserContext).setUser;

    const [email, setEmail] = useState<String>();
    const [password, setPassword] = useState<String>();

    const navigate = useNavigate();

    async function handleSubmit() {
        clearFlash(setFlashMessage);
        const resp: [symbol, string] = await signIn(email, password, setUser, setToken, navigate);
        getFlash(setFlashMessage, resp);
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