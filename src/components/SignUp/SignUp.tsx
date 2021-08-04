import { useState } from 'react';
import Form, { FormProps } from '../Form/Form';
import { FetchDetails, protectedRequest } from '../../utils/fetch-requests';
import { useHistory } from 'react-router-dom';

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

        // try {
        //     const response = await authenticate('signup', {
        //         username,
        //         email,
        //         password
        //     });

        //     history.push('/log-in');
        // } catch(err) {
        //     console.log(err);
        // }

        const successHandler = () => {
            history.push('/log-in');
        };

        const errorHandler = (err: Error) => {
            console.log('Error registering user', err.message);
        };

        const fetchDetails: FetchDetails = {
            fetchURI: '/api/auth/signup',
            method: 'POST',
            body: {
                username,
                email,
                password
            }
        };

        protectedRequest(fetchDetails, '', successHandler, errorHandler);
    };

    const formProps: FormProps = {
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
        onSubmit: signUp
    };

    return (
        <div className='form-container sign-up'>
            <div className='form-title'>Sign Up</div>
            <Form {...formProps}/>
        </div>
    );
};

export default SignUp;