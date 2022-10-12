import { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Menu({ user_id, token, logOut }: { user_id: Number, token: string, logOut: MouseEventHandler<HTMLAnchorElement> }): ReactElement {
    return (
        <nav className="mb-3">
            <div className="container">
                {token ?
                    <div className="row">
                        <div className="column logo"><Link to="/" title="Home">AroundHelp</Link></div>
                        <div className="column">
                            <Link to={`/user/${user_id}`} title="Your profile">My profile</Link>
                            <Link to="">Needs</Link>
                            <Link to="">Messages</Link>
                            <Link to="/" onClick={logOut}>Log out</Link>
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="column logo"><Link to="/" title="Home">AroundHelp</Link></div>
                        <div className="column">
                            <Link to="/login" title="Sign in form">Log in</Link>
                            <Link to="/register" title="Sign up form">Register</Link>
                        </div>
                    </div>
                }
            </div >
        </nav >
    )
}