import { Redirect } from 'react-router-dom';
import useUserSelector from '../../hooks/useUserSelector';
import Form, { FormProps } from './Form';

export interface AuthenticationFormProps extends FormProps{
    redirectTo: string;
}

const AuthenticationForm: React.FC<AuthenticationFormProps>  = (props: AuthenticationFormProps) => {
    const isAuthenticated = useUserSelector();

    return (
        <>
            {
                isAuthenticated?
                    <Redirect to={props.redirectTo} />
                :
                    <Form {...props}>
                        {props.children}
                    </Form>
            }
        </>
    );
};

export default AuthenticationForm;