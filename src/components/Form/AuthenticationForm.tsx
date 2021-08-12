import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form, { FormProps } from './Form';

export interface AuthenticationFormProps extends FormProps{
    redirectTo: string;
}

const AuthenticationForm: React.FC<AuthenticationFormProps>  = (props: AuthenticationFormProps) => {
    const isAuthenticated = useSelector(state => state);

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