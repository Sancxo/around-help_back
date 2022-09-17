import { lazy, ReactElement, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import User from "./shared/interfaces/user.interface";

const Home = lazy((): Promise<any> => import('./pages/Home'));
const SignIn = lazy((): Promise<any> => import('./pages/SignIn'));
const UserProfile = lazy((): Promise<any> => import('./pages/UserProfile'));

function App(): ReactElement {
  const [user, setUser] = useState<User>({
    id: -1,
    first_name: "",
    last_name: "",
    email: ""
  });

  return (
    <div className="App">
      <Router>
        <header className="App-header">
        </header>

        <main>
          <Suspense fallback="Loading app ...">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sign-in' element={<SignIn user={user} setUser={setUser} />} />
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
