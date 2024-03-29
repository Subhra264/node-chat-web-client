import { authenticate } from '../../utils/fetch-requests';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { manageUser } from '../../utils/actions/User.actions';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Dispatch } from 'redux';
import AuthenticationForm, {
  AuthenticationFormProps,
} from '../Form/AuthenticationForm';
import ResponseError from '../../utils/ResponseError';
import TokenManager from '../../utils/TokenManager';
import { User } from '../../utils/reducers/User.reducer';
import { SSK_REFRESH_TOKEN_INVALID, SSK_USER } from '../../utils/storage-items';

const LogIn: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<ResponseError>();
  const dispatch: Dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const locationState: any = location.state;

  const changeUsername: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
    setUsername((ev.target as HTMLInputElement)?.value);
  };

  const changePassword: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
    setPassword((ev.target as HTMLInputElement)?.value);
  };

  const changeEmail: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
    setEmail((ev.target as HTMLInputElement)?.value);
  };

  const logIn: React.MouseEventHandler = async (ev: React.MouseEvent) => {
    try {
      ev.preventDefault();
      const result: User = await authenticate('signin', {
        username,
        email,
        password,
      });

      const user = {
        username: result.username,
        userId: result.userId,
      };

      // Store the userId and username in the sessionStorage so that
      // When the user refreshes the page, we can read the userId and the
      // username just to know that the user is already logged in.
      // The access-token must not be stored in sessionStorage.
      sessionStorage.setItem(SSK_USER, JSON.stringify(user));
      sessionStorage.removeItem(SSK_REFRESH_TOKEN_INVALID);

      // Save the token in TokenManager
      TokenManager.manager.saveToken(result.accessToken as string);
      dispatch(manageUser(user));

      // Get the redirectTo query if available
      const redirectTo = locationState?.redirectTo
        ? locationState.redirectTo
        : '/profile/@me';
      history.push(redirectTo);
    } catch (err) {
      console.log('Error while login:', (err as Error).message);
      setError(err as ResponseError);
    }
  };

  const formProps: AuthenticationFormProps = {
    fields: {
      username: {
        type: 'text',
        required: true,
        onChange: changeUsername,
      },
      email: {
        type: 'email',
        required: true,
        onChange: changeEmail,
      },
      password: {
        type: 'password',
        required: true,
        onChange: changePassword,
      },
    },
    onSubmit: logIn,
    redirectTo: locationState?.redirectTo
      ? locationState.redirectTo
      : '/profile/@me',
    error,
  };

  return (
    <div className="form-container log-in">
      <div className="form-title">Log In</div>
      <AuthenticationForm {...formProps}>
        <div className="form-footer">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </div>
      </AuthenticationForm>
    </div>
  );
};

export default LogIn;
