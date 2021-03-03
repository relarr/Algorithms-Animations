import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navigation from './shared/navigation/Navigation';
import Maze from './searching/Maze';
import Sorting from './sorting/Sorting';
import DefaultMaze from './DefaultMaze/DefaultMaze';

import './App.css';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navigation />
        <main>
          <Switch>
            <Route exact path='/'>
              <DefaultMaze />
            </Route>
            <Route path='/searching-algorithms'>
              <Maze />
            </Route>
            <Route path='/sorting-algorithms'>
              <Sorting />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
