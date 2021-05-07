import Form, {FormProps} from "../common/Form/Form"

const formProps: FormProps = {
    username: {
        type: 'text',
        required: true
    },
    email: {
        type: 'email',
        required: true
    },
    password: {
        type: 'password',
        required: true
    }
};

const LogIn: React.FC = (): JSX.Element => {
    return (
        <div className='form-container log-in'>
            <div className='form-title'>Log In</div>
            <Form />
        </div>
    );
};

export default LogIn;