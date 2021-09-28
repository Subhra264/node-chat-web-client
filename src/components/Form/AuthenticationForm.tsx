import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useUserSelector from '../../hooks/useUserSelector';
import TokenManager from '../../utils/TokenManager';
import Form, { FormProps } from './Form';

export interface AuthenticationFormProps extends FormProps{
    redirectTo: string;
    refreshTokenInvalid?: boolean;
}

const AuthenticationForm: React.FC<AuthenticationFormProps>  = (props: AuthenticationFormProps) => {
    const isAuthenticated = useUserSelector();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.refreshTokenInvalid) {
            setLoading(false);
        } else {
            TokenManager.manager.getToken(dispatch).then(token => {
                // For now, do nothing with the token
                // Also no need to set loading to false
            }).catch(err => {
                setLoading(false);
            });
        }
    }, []);

    return (
        <>
            {
                isAuthenticated?
                    <Redirect to={props.redirectTo} />
                :
                    !loading?   
                        <Form {...props}>
                            {props.children}
                        </Form>
                    :
                        ''
            }
        </>
    );
};

export default AuthenticationForm;