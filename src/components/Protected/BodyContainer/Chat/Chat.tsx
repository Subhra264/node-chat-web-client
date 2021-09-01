import { useState } from 'react';
import SelfChatFooter from '../ChatFooter/SelfChatFooter';
import './Chat.scss';
import ChatBody from './ChatBody/ChatBody';

export enum ChatTarget {
    GROUP = 'GROUP',
    FRIEND = 'FRIEND',
    SELF = 'SELF'
}

export interface Message {
    message: string;
    sender: {
        username: string;
        reference: string;
    }
}

export interface ChatSetMessages {
    setMessages: React.Dispatch<React.SetStateAction<[Message] | []>>;
}

interface ChatProps {
    chatTargetSelf?: boolean;
}

const Chat: React.FC<ChatProps> = (props): JSX.Element => {
    const [messages, setMessages] = useState<[Message] | []>([]);

    return (
        <div id='chat-box'>
            <div id='chat-header'>
                {/* {props.channel.name} */}
            </div>
            <div id='chat-body'>
                {
                    props.chatTargetSelf?
                        <ChatBody messages={messages}/>
                    :
                        ''
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
            {
                props.chatTargetSelf?
                    <SelfChatFooter setMessages={setMessages} />
                :
                    ''
            }
        </div>
    );
};

export default Chat;