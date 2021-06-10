import Editor from './Editor';
import './Chat.scss';

// interface Message {
//     msg: string;
//     userId: string;
// }

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
                    //         {message.msg}
                    //     </div>
                    // ))
                }
            </div>
            <div id='chat-msg'>
                <Editor />
            </div>
        </div>
    );
};

export default Chat;