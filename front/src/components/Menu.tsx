import { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";
import User from "../shared/interfaces/user.interface";

export default function Menu({ user, logOut }: { user: User, logOut: MouseEventHandler<HTMLAnchorElement> }): ReactElement {
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