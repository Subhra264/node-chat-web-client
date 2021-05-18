import Editor from './Editor';

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
        <div className='chat'>
            <div className='chat-header'>
                {/* {props.channel.name} */}
            </div>
            <div className='chat-body'>
                {
                    // props.messages?.map((message) => (
                    //     <div className={(message.userId === userId)? 'right': 'left'}> 
                    //         {message.msg}
                    //     </div>
                    // ))
                }
            </div>
            <div className='chat-msg'>
                <Editor />
            </div>
        </div>
    );
};

export default Chat;