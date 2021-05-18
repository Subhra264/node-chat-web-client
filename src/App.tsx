import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import Protected from './components/Protected/Protected';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/log-in'>
          <LogIn />
        </Route>
        <Route path='/sign-up'>
          <SignUp />
        </Route>
        <Route path='/' exact>
          <Protected />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
