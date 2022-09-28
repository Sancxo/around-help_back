import { lazy, ReactElement, Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import User from "./shared/interfaces/user.interface";

import Menu from "./components/Menu";
import axios from 'axios';
import { getLocalInfos, resetUserInfos, setUserInfos } from './shared/helpers/user.helper';

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

  const [user, setUser] = useState<User>(defaultUser);
  const [token, setToken] = useState("");


  const [localToken, localUser] = getLocalInfos();
  console.log("Local Token: ", localToken);
  console.log("Local User: ", localUser);

  useEffect(() => {

    if (localToken === "" || localToken === undefined) {
      resetUserInfos(defaultUser, setUser, setToken, axios.defaults.headers);
      console.info("Disonnected!");
    } else {
      setUserInfos(localUser, setUser, localToken, setToken, axios.defaults.headers)
      console.info("Connected!");
    }
  }, [defaultUser, localToken, localUser])

  function logOut() {
    const config: any = { headers: { authorization: token } };
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/users/sign_out`, config)
      .then(resp => {
        if (resp.status === 200) {
          resetUserInfos(defaultUser, setUser, setToken, axios.defaults.headers);
        };
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            <Menu user={user} logOut={logOut} />
          </nav>
        </header>

        <main>
          <Suspense fallback="Loading app ...">
            <Routes>
              <Route element={<Home />} path='/' />
              <Route path='/register' element={<Register setUser={setUser} setToken={setToken} />} />
              <Route path='/login' element={<Login setUser={setUser} setToken={setToken} />} />
              <Route path="/user/:id" element={token === "" ? <Navigate to="/" /> : <UserProfile user={user} />} />
            </Routes>
          </Suspense>
        </main>

        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
