import React, { useState } from "react";
import Form, { FormProps } from "../Form/Form";
import './ModalBox.scss';

interface ModalBoxProps {
    show: boolean;
    form?: FormProps;
    info?: string;
}

const ModalBox: React.FC<ModalBoxProps> = (props: ModalBoxProps): JSX.Element => {
    const [isClosed, setIsClosed] = useState(false);

    const closeModal = () => {
        setIsClosed(true);
    };

    return (
        <div className={`modal-box-container ${props.show && !isClosed? '' : 'display-none'}`} >
            <div className='modal-box'>
                <div className='modal-box-header'>
                    <div className='modal-box-name'>

                    </div>
                    <div className='close-button' onClick={closeModal}>
                        &times;
                    </div>
                </div>
                <div className='modal-box-content'>
                    {/* <Form /> */}
                    {
                        props.form? 
                            <Form {...props.form} />
                        :
                            props.info
                    }
                </div>
            </div>
        </div>
    );
}

export default ModalBox;