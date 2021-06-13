import Editor from './Editor';
import './Chat.scss';

interface Message {
    msg: string;
    userName: string;
    userId: string;
}

// interface ChatProps {
//     channel: {
//         name: string;
//     };
//     messages?: [Message]
// }

const Chat: React.FC = (props): JSX.Element => {
    return (
        <div id='chat-box'>
            <div id='chat-header'>
                {/* {props.channel.name} */}
            </div>
            <div id='chat-body'>
                {
                    // props.messages?.map((message) => (
                    //     <div className={(message.userId === userId)? 'right': 'left'}> 
                    //         {
                    //             (message.userId !== userId)? 
                    //                 <div className='left'>
                    //                     {message.userName}
                    //                 </div>
                    //             : ''
                    //         }
                    //         {message.msg}
                    //     </div>
                    // ))
                }
                
                {/* */}
                {/* <div className='right'>
                    Hello testing, I am Bob...
                </div>
                <div className='left'>
                    Alex
                    <div className='left-content'>
                        Hello testing, I am Alex...
                    </div>
                </div> */}
            </div>
            <div id='chat-msg'>
                <Editor />
            </div>
        </div>
    );
};

export default Chat;