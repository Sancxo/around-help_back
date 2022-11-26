import { lazy, ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Menu from "./components/Menu";
import Flash from './components/Flash';
import axios from 'axios';
import { defaultUser, resetUserInfos, signInWtihToken, signOut } from './shared/helpers/user.helper';
import { FlashMessageContext, TokenContext, UserContext } from './shared/context';
import { getFlash } from './shared/helpers/flash.helper';
import { setContext } from './shared/interfaces/misc.interfaces';
import User from './shared/interfaces/user.interfaces';

const Home = lazy((): Promise<any> => import('./pages/Home'));
const Register = lazy((): Promise<any> => import('./pages/auth/Register'));
const Login = lazy((): Promise<any> => import('./pages/auth/Login'));
const UserProfile = lazy((): Promise<any> => import('./pages/user/UserProfile'));
const EditProfile = lazy((): Promise<any> => import('./pages/user/EditProfile'));

function App(): ReactElement {
  const localToken = localStorage.getItem("auth_token");

  // Media queries sizes based on Milligram library 
  const mediaQueryTablet: MediaQueryList = window.matchMedia("(min-width: 400px)");
  const mediaQueryDesktop: MediaQueryList = window.matchMedia("(min-width: 800px)");

  // Context
  const setUser: setContext<User> = useContext(UserContext).setUser;
  const { token, setToken } = useContext(TokenContext);
  const setFlashMessage = useContext(FlashMessageContext).setFlashMessage;

  // State
  const [isDesktop, setIsDesktop] = useState(mediaQueryDesktop.matches ? true : false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Used to automatilcally login or out the user depending on the token presence
  useEffect(() => {
    (!localToken || localToken === "undefined") &&
      resetUserInfos(defaultUser, setUser, setToken, axios.defaults.headers);

    localToken &&
      signInWtihToken(localToken, setUser, setToken);
  }, [localToken, setToken, setUser])

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

  async function logOut() {
    signOut(token, defaultUser, setUser, setToken)
      .then(resp => getFlash(setFlashMessage, resp));
  }

  return (
    <div className="text-center">
      <Router>
        <header className="App-header mb-1">
          <Menu logOut={logOut} isDesktop={isDesktop} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </header>


        <main className={`${isMobileMenuOpen && mediaQueryTablet.matches && "pt-4"}`} >
          <Suspense fallback="Loading app ...">
            <Routes>
              <Route element={<Home />} path='/' />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path="/user/:id" element={!localToken ? <Navigate to="/" /> : <UserProfile defaultUser={defaultUser} />} />
              <Route path="/profile-edit" element={!localToken ? <Navigate to="/" /> : <EditProfile />} />
            </Routes>
          </Suspense>
        </main>

        <Flash />

        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
