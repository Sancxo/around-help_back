import { MouseEventHandler, ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { TokenContext } from "../shared/context";

export default function Menu(
    { user_id, logOut, isDesktop, isMobileMenuOpen, setIsMobileMenuOpen }: {
        user_id: Number,
        logOut: MouseEventHandler<HTMLAnchorElement>,
        isDesktop: boolean,
        isMobileMenuOpen: boolean,
        setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    }): ReactElement {

    const token: string = useContext(TokenContext).token;

    return (
        <nav>
            <div className="container mt-05">
                <div className="row">
                    <h1 className="column logo mb-0">
                        <Link to="/" title="Home" onClick={() => setIsMobileMenuOpen(false)}>AroundHelp</Link>
                    </h1>
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