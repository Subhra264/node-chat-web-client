import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useUserSelector from '../../hooks/useUserSelector';
import { SSK_REFRESH_TOKEN_INVALID } from '../../utils/storage-items';
import TokenManager from '../../utils/TokenManager';
import Form, { FormProps } from './Form';

export interface AuthenticationFormProps extends FormProps {
  redirectTo: string;
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = (
  props: AuthenticationFormProps,
) => {
  const isAuthenticated = useUserSelector();
  console.log(
    'AuthenticationForm component, isAuthenticated?',
    isAuthenticated,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If refreshToken is invalid, then no need to use TokenManager.getToken() again
    if (sessionStorage.getItem(SSK_REFRESH_TOKEN_INVALID)) {
      setLoading(false);
    } else {
      TokenManager.manager
        .getToken()
        .then((token) => {
          // For now, do nothing with the token
          // Also no need to set loading to false
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Redirect to={props.redirectTo} />
      ) : !loading ? (
        <Form {...props}>{props.children}</Form>
      ) : (
        ''
      )}
    </>
  );
};

export default AuthenticationForm;
