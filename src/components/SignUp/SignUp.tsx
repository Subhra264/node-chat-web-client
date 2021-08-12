import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticate } from '../../utils/fetch-requests';
import AuthenticationForm, { AuthenticationFormProps } from '../Form/AuthenticationForm';

const SignUp: React.FC = (): JSX.Element => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
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
                password
            });

            history.push('/log-in');
        } catch(err) {
            console.log(err);
        }
    };

    const formProps: AuthenticationFormProps = {
        fields: {
            username: {
                type: 'text',
                required: true,
                onChange: changeUsername
            },
            email: {
                type: 'email',
                required: true,
                onChange: changeEmail
            },
            password: {
                type: 'password',
                required: true,
                onChange: changePassword
            }
        },
        onSubmit: signUp,
        redirectTo: '/profile/@me'
    };

    return (
        <div className='form-container sign-up'>
            <div className='form-title'>Sign Up</div>
            <AuthenticationForm {...formProps} />
        </div>
    );
};

export default SignUp;