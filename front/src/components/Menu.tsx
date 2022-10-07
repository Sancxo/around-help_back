import { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Menu({ user_id, token, logOut }: { user_id: Number, token: string, logOut: MouseEventHandler<HTMLAnchorElement> }): ReactElement {
    return (
        <div>
            {token ?
                <ul>
                    <li><Link to="/" title="Home">AroundHelp</Link></li>
                    <li><Link to={`/user/${user_id}`} title="Your profile">My profile</Link></li>
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