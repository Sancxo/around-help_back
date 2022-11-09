import React, { MouseEventHandler, ReactComponentElement } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileMenu({ token, user_id, logOut, setIsMobileMenuOpen }: {
  token: string,
  user_id: Number,
  logOut: MouseEventHandler<HTMLAnchorElement>,
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}): ReactComponentElement<React.JSXElementConstructor<HTMLDivElement>, Pick<React.ComponentProps<React.JSXElementConstructor<HTMLDivElement>>, keyof HTMLDivElement>> {
  const { pathname } = useLocation();

  // Pathnames
  const needs = "/needs";
  const messages = "/messages";
  const profile = `/user/${user_id}`;
  const login = "/login";
  const register = "/register";

  return (
    <div className="column flex align-center justify-end ">
      {
        (token || token === "undefined") ?
          <div className="flex gap-3 menu">
            <Link to={profile} title="Your profile" onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === profile && "active"}`}>My profile</Link >
            <Link to={needs} onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === needs && "active"}`}>Needs</Link>
            <Link to={messages} onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === messages && "active"}`}>Messages</Link>
            <Link to="/" onClick={e => { logOut(e); setIsMobileMenuOpen(false); }}>Log out</Link>
          </div>
          :
          <div className="flex gap-3 menu">
            <Link to={login} title="Sign in form" onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === login && "active"}`}>Log in</Link>
            <Link to={register} title="Sign up form" onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === register && "active"}`}>Register</Link>
          </div>
      }
    </div >
  )
}