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

  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>(defaultUser);

  const localToken = localStorage.getItem("auth_token");

  useEffect(() => {
    !localToken &&
      resetUserInfos(defaultUser, setUser, setToken, axios.defaults.headers);
    localToken && signInWtihToken(localToken, setUser, setToken);
  }, [localToken, defaultUser, user.id])

  function logOut() {
    signOut(token, defaultUser, setUser, setToken)
  }

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            <Menu token={token} user_id={user.id} logOut={logOut} />
          </nav>
        </header>

        <main>
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
