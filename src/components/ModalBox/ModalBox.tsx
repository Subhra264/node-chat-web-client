import React, { useState } from "react";
import Form, { FormProps } from "../Form/Form";

interface ModalBoxProps {
    show: boolean;
    form?: FormProps;
    info?: string;
}

const ModalBox: React.FC<ModalBoxProps> = (props: ModalBoxProps): JSX.Element => {

    return (
        <div className={`modal-box-container ${props.show}`} >
            <div className='modal-box'>
                <div className='modal-box-header'>
                    <div className='modal-box-name'>

                    </div>
                    <div className='close-button'>
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