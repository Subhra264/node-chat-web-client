import Form, { FormProps } from "../Form/Form";
import { FetchDetails, protectedRequest } from '../../utils/fetch-requests';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { manageUser } from "../../utils/actions/User.actions";
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

    const changeUsername: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
        setUsername((ev.target as HTMLInputElement)?.value);
    };

    const changePassword: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
        setPassword((ev.target as HTMLInputElement)?.value);
    };

    const changeEmail: React.ChangeEventHandler = (ev: React.ChangeEvent) => {
        setEmail((ev.target as HTMLInputElement)?.value);
    };

    const logIn: React.MouseEventHandler = (ev: React.MouseEvent) => {
        ev.preventDefault();

        const successHandler = (result: any) => {
            // Store the userId and username in the localstorage so that
            // When the user refreshes the page, we can read the userId and the
            // username just to know that the user is already logged in.
            // The access-token must not be stored in localstorage.
            localStorage.setItem('user', JSON.stringify({
                username: result.username,
                userId: result.userId
            }));
            dispatch(manageUser(result));

            // Get the redirectTo query if available
            const redirectTo = locationState?.redirectTo? locationState.redirectTo : '/profile/@me';
            history.push(redirectTo);
        };

        const errorHandler = (err: Error) => {
            console.log('Error while login:', err.message);
        };

        const fetchDetails: FetchDetails = {
            fetchURI: '/api/auth/signin',
            method: 'POST',
            body: {
                username,
                email,
                password
            }
        };

        // We don't need to send any access key to '/signin' route
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