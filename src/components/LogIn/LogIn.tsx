import Form, { FormProps } from "../Form/Form";
import authenticate from '../../utils/authenticate';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../utils/actions/User.actions";
import { useHistory, useLocation } from "react-router-dom";
import { Dispatch } from "redux";

const LogIn: React.FC = (): JSX.Element => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch: Dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const locationState: any = location.state;
    console.log(location);

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

        try {
            const response = await authenticate('signin', {
                username,
                email,
                password
            });

            dispatch(authenticateUser(response));

            // Get the redirect_to query if available
            const searchParams = new URLSearchParams(location.search);
            // const redirectTo = (searchParams.get('redirect_to')? searchParams.get('redirect_to') : '/profile/@me') as string;
            const redirectTo = locationState?.redirectTo? locationState.redirectTo : '/profile/@me';
            history.push(redirectTo);

        } catch(err) {
            console.log(err);
        }
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