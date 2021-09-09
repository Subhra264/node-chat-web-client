import React from 'react';
import './Form.scss';

interface InputField {
    type: string;
    required?: boolean;
    placeholder?: string;
    value?: string;
    readonly?: boolean;
    className?: string;
    onChange?: React.ChangeEventHandler
}

interface FormInputProps {
    [field: string]: InputField;
}

export interface FormProps {
    fields: FormInputProps;
    onSubmit: React.MouseEventHandler<HTMLInputElement>;
    children?: JSX.Element;
}

const Form: React.FC<FormProps> = (props): JSX.Element => {
    const inputElems: JSX.Element[] = [];

    for(const field in props.fields) {
        const inputField: InputField = props.fields[field];

        inputElems.push(
            <input placeholder={field} {...inputField} key={field} />
        );
    }

    return (
        <div className='form'>
            <form>
                {inputElems}
                <input type='submit' value='Submit' id='submit-button' onClick={props.onSubmit}/>
            </form>
            { props.children }
        </div>
    );
};

export default Form;