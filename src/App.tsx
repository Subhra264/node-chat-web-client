import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import Protected from './components/Protected/Protected';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/log-in' exact>
          <LogIn />
        </Route>
        <Route path='/sign-up' exact>
          <SignUp />
        </Route>
        <Route path='/not-found' exact>
          <NotFound />
        </Route>
        <Route >
          <Protected />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
