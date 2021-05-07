interface InputField {
    type: string;
    required?: boolean;
    placeholder?: string;
    value?: string;
    readonly?: boolean;
    className?: string;
}

export interface FormProps {
    [field: string]: InputField;
}

const Form: React.FC<FormProps> = (props): JSX.Element => {
    const inputElems: JSX.Element[] = [];

    for(const field in props) {
        const inputField: InputField = props[field];

        inputElems.push(
            <input placeholder={field} {...inputField} key={field} />
        );
    }

    return (
        <div>
            <form>
                {inputElems}
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
};

export default Form;