import { lazy, ReactElement, Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import User from "./shared/interfaces/user.interface";

import Menu from "./components/Menu";
import axios from 'axios';
import { resetUserInfos, signInWtihToken, signOut } from './shared/helpers/user.helper';

const Home = lazy((): Promise<any> => import('./pages/Home'));
const Register = lazy((): Promise<any> => import('./pages/Register'));
const Login = lazy((): Promise<any> => import('./pages/Login'));
const UserProfile = lazy((): Promise<any> => import('./pages/UserProfile'));

function App(): ReactElement {
  const defaultUser: User = useMemo(() => {
    return {
      id: 0,
      first_name: "",
      last_name: "",
      email: ""
    }
  }, []);
  const localToken = localStorage.getItem("auth_token");

  // Media queries sizes based on Milligram library 
  const mediaQueryTablet: MediaQueryList = window.matchMedia("(min-width: 400px)");
  const mediaQueryDesktop: MediaQueryList = window.matchMedia("(min-width: 800px)");

  // State
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>(defaultUser);
  const [isDesktop, setIsDesktop] = useState(mediaQueryDesktop.matches ? true : false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Used to automatilcally login or out the user depending on the token presence
  useEffect(() => {
    !localToken &&
      resetUserInfos(defaultUser, setUser, setToken, axios.defaults.headers);
    localToken && signInWtihToken(localToken, setUser, setToken);
  }, [localToken, defaultUser, user.id])

  // Handle the switch between desktop or mobile menu dependeing on the mediaquery
  useEffect(() => {
    mediaQueryDesktop.addEventListener('change', _ => {
      setIsDesktop(!isDesktop);
      isDesktop && setIsMobileMenuOpen(false);
    })
    return mediaQueryDesktop.removeEventListener('change', _ => {
      setIsDesktop(!isDesktop);
      isDesktop && setIsMobileMenuOpen(false);
    });
  })

  function logOut() {
    signOut(token, defaultUser, setUser, setToken)
  }

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Menu token={token} user_id={user.id} logOut={logOut} isDesktop={isDesktop} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </header>

        <main className={`${isMobileMenuOpen && mediaQueryTablet.matches && "pt-4"}`} >
          <Suspense fallback="Loading app ...">
            <Routes>
              <Route element={<Home />} path='/' />
              <Route path='/register' element={<Register setUser={setUser} setToken={setToken} />} />
              <Route path='/login' element={<Login setUser={setUser} setToken={setToken} />} />
              <Route path="/user/:id" element={!localToken ? <Navigate to="/" /> : <UserProfile defaultUser={defaultUser} token={token} />} />
            </Routes>
          </Suspense>
        </main>

        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
