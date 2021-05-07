import Form, {FormProps} from "../common/Form/Form";

const formProps: FormProps = {
    username: {
        type: 'text',
        required: true
    },
    email: {
        type: 'email',
        required: true,
    },
    password: {
        type: 'password',
        required: true
    }
};

const SignUp: React.FC = (): JSX.Element => {
    return (
        <div className='form-container sign-up'>
            <div className='form-title'>Sign Up</div>
            <Form {...formProps}/>
        </div>
    );
};

export default SignUp;