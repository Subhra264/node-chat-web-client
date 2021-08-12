import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import Protected from './components/Protected/Protected';
import NotFound from './components/NotFound/NotFound';
import { manageUser } from './utils/actions/User.actions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(manageUser(JSON.parse(localStorage.getItem('user') as string)));
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          
        </Route>  
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
