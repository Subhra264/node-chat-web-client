import ResponseError from "../../utils/ResponseError";
import './Error.scss';

export interface ErrorProps {
    error?: ResponseError;
}

const Error: React.FC<ErrorProps> = (props) => {
    return (
        <div className={`error ${props.error? '' : 'display-none'}`}>
            {props.error?.message}
        </div>
    );
};

export default Error;