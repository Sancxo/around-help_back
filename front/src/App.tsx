import { lazy, ReactElement, Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import User from "./shared/interfaces/user.interface";

import Menu from "./components/Menu";
import axios from 'axios';

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

  useEffect(() => {
    console.info(token);
    if (token === "") {
      console.info("Disconnected!")
      setToken("");
      setUser(defaultUser);
      axios.defaults.headers.common["Authorization"] = "";
    } else console.info("Connected!");
  }, [token, defaultUser])

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav>
            <Menu user={user} token={token} setUser={setUser} setToken={setToken} />
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
