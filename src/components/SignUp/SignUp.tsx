import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authenticate } from '../../utils/fetch-requests';
import ResponseError from '../../utils/ResponseError';
import AuthenticationForm, {
  AuthenticationFormProps,
} from '../Form/AuthenticationForm';

const SignUp: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<ResponseError>();
  const history = useHistory();

  const changeUsername: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
    setUsername((ev.target as HTMLInputElement)?.value);
  };

  const changePassword: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
    setPassword((ev.target as HTMLInputElement)?.value);
  };

  const changeEmail: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
    setEmail((ev.target as HTMLInputElement)?.value);
  };

  const signUp: React.MouseEventHandler = async (ev: React.MouseEvent) => {
    ev.preventDefault();

    try {
      await authenticate('signup', {
        username,
        email,
        password,
      });

      history.push('/log-in');
    } catch (err) {
      console.log(err);
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
    onSubmit: signUp,
    redirectTo: '/profile/@me',
    error,
  };

  return (
    <div className="form-container sign-up">
      <div className="form-title">Sign Up</div>
      <AuthenticationForm {...formProps}>
        <div className="form-footer">
          Already have an account? <Link to="/log-in">Log In</Link>
        </div>
      </AuthenticationForm>
    </div>
  );
};

export default SignUp;
