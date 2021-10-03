import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import Protected from './components/Protected/Protected';
import NotFound from './components/NotFound/NotFound';
import { manageUser } from './utils/actions/User.actions';
import { useDispatch } from 'react-redux';
import { SSK_USER } from './utils/storage-items';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem(SSK_USER)) {
      dispatch(manageUser(JSON.parse(sessionStorage.getItem(SSK_USER) as string)));
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
