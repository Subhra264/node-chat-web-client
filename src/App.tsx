import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';

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
      </Switch>
    </div>
  );
}

export default App;
