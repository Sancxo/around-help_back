import React, { MouseEventHandler, ReactComponentElement } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({ token, user_id, logOut, setIsMobileMenuOpen }: {
  token: string,
  user_id: Number,
  logOut: MouseEventHandler<HTMLAnchorElement>,
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}): ReactComponentElement<React.JSXElementConstructor<HTMLDivElement>, Pick<React.ComponentProps<React.JSXElementConstructor<HTMLDivElement>>, keyof HTMLDivElement>> {
  return (
    <div className="column flex align-center justify-end ">
      {
        token ?
          <div className="flex gap-3 menu">
            <Link to={`/user/${user_id}`} title="Your profile" onClick={() => setIsMobileMenuOpen(false)}>My profile</Link >
            <Link to="" onClick={() => setIsMobileMenuOpen(false)}>Needs</Link>
            <Link to="" onClick={() => setIsMobileMenuOpen(false)}>Messages</Link>
            <Link to="/" onClick={e => { logOut(e); setIsMobileMenuOpen(false); }}>Log out</Link>
          </div>
          :
          <div className="flex gap-3 menu">
            <Link to="/login" title="Sign in form" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
            <Link to="/register" title="Sign up form" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
          </div>
      }
    </div >
  )
}