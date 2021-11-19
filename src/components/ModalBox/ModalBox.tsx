import React from "react";
import Form, { FormProps } from "../Form/Form";
import './ModalBox.scss';

interface ModalBoxProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    form?: FormProps;
    name?: string;
}

const ModalBox: React.FC<ModalBoxProps> = (props): JSX.Element => {

    const closeModal = () => {
        props.setShow(!props.show);
    };

    return (
        <div className={`modal-box-container ${props.show? '' : 'display-none'}`} >
            <div className='modal-box'>
                <div className='modal-box-header'>
                    <div className='modal-box-name'>
                        {props.name}
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
                            props.children
                    }
                </div>
            </div>
        </div>
    );
}

export default ModalBox;