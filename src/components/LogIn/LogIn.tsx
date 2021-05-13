import Form, { FormProps } from "../common/Form/Form";
import authenticate from '../../utils/authenticate';
import React, { useState } from "react";

const LogIn: React.FC = (): JSX.Element => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        ev.preventDefault();

        const response = await authenticate('signin', {
            username,
            email,
            password
        });

        console.log(response);
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
        onSubmit: logIn
    };

    return (
        <div className='form-container log-in'>
            <div className='form-title'>Log In</div>
            <Form {...formProps}/>
        </div>
    );
};

export default LogIn;