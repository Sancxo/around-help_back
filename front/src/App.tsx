import { lazy, ReactElement, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const Home = lazy((): Promise<any> => import('./pages/Home'));

function App(): ReactElement {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
        </header>

        <main>
          <Suspense fallback="Loading app ...">
            <Routes>
              <Route path='/' element={<Home />}></Route>
            </Routes>
          </Suspense>
        </main>

        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
