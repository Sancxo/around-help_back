import axios from "axios";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import User from "../shared/interfaces/user.interface";

export default function Menu({ user, token, setUser, setToken }: { user: User, token: String, setUser: React.Dispatch<React.SetStateAction<User>>, setToken: React.Dispatch<React.SetStateAction<string>> }): ReactElement {
    function logOut() {
        const config: any = { headers: { authorization: token } };
        axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/users/sign_out`, config)
            .then(resp => {
                if (resp.status === 200) {
                    setUser({
                        id: 0,
                        first_name: "",
                        last_name: "",
                        email: ""
                    });
                    setToken("");
                    axios.defaults.headers.common["Authorization"] = "";
                };
            })
            .catch(err => console.error(err));
    }
    return (
        <div>
            {user.id ?
                <ul>
                    <li><Link to="/" title="Home">AroundHelp</Link></li>
                    <li><Link to={`/user/${user.id}`} title="Your profile">My profile</Link></li>
                    <li><Link to="">Needs</Link></li>
                    <li><Link to="">Messages</Link></li>
                    <li><Link to="/" onClick={logOut}>Log out</Link></li>
                </ul>
                :
                <ul>
                    <li><Link to="/" title="Home">AroundHelp</Link></li>
                    <li><Link to="/login" title="Sign in form">Log in</Link></li>
                    <li><Link to="/register" title="Sign up form">Register</Link></li>
                </ul>
            }
        </div >
    )
}