import ResponseError from "../../utils/ResponseError";
import './Error.scss';

const Error: React.FC<ResponseError> = (props: ResponseError) => {
    return (
        <div className={`error ${props? '' : 'display-none'}`}>
            {props.message}
        </div>
    );
};

export default Error;