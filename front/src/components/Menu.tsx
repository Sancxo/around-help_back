import { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export default function Menu(
    { user_id, token, logOut, isDesktop, isMobileMenuOpen, setIsMobileMenuOpen }: {
        user_id: Number,
        token: string,
        logOut: MouseEventHandler<HTMLAnchorElement>,
        isDesktop: boolean,
        isMobileMenuOpen: boolean,
        setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    }): ReactElement {

    return (
        <nav className="mb-1">
            <div className="container">
                <div className="row">
                    <div className="column logo">
                        <Link to="/" title="Home" onClick={() => setIsMobileMenuOpen(false)}>AroundHelp</Link>
                    </div>
                    {isDesktop ?
                        <DesktopMenu token={token} user_id={user_id} logOut={logOut} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                        :
                        <MobileMenu token={token} user_id={user_id} logOut={logOut} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    }
                </div>
            </div >
        </nav >
    )
}