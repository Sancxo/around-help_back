import { lazy, ReactElement, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import User from "./shared/interfaces/user.interface";

import Menu from "./components/Menu";

const Home = lazy((): Promise<any> => import('./pages/Home'));
const Register = lazy((): Promise<any> => import('./pages/Register'));
const Login = lazy((): Promise<any> => import('./pages/Login'));
const UserProfile = lazy((): Promise<any> => import('./pages/UserProfile'));

function App(): ReactElement {
  const [user, setUser] = useState<User>({
    id: 0,
    first_name: "",
    last_name: "",
    email: ""
  });
  const [token, setToken] = useState("");

  if (!token) {
    // Login page redirect
  }

  useEffect(() => {
    token ? console.log(true) : console.log(false);
    console.log(token);
    console.log(user);
  }, [token, user])

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
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register setUser={setUser} setToken={setToken} />} />
              <Route path='/login' element={<Login setUser={setUser} setToken={setToken} />} />
              <Route path="/user/:id" element={<UserProfile user={user} />} />
            </Routes>
          </Suspense>
        </main>

        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
