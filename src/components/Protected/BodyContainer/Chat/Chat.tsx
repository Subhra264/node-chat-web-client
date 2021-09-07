import { useEffect, useState } from 'react';
import { useAccessToken } from '../../../../hooks/useUserSelector';
import { getRequest } from '../../../../utils/fetch-requests';
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
    chatTarget: ChatTarget;
}

interface SelfChatProps extends ChatProps{
    chatTarget: ChatTarget.SELF;
}

interface GroupChatProps extends ChatProps{
    chatTarget: ChatTarget.GROUP;
    groupId: string;
    channelId: string;
}

const Chat: React.FC<GroupChatProps | SelfChatProps> = (props): JSX.Element => {
    const [messages, setMessages] = useState<[Message] | []>([]);
    const accessToken: string = useAccessToken();
    
    useEffect(() => {
        const successHandler = (result: [Message]) => {
            setMessages(result);
        };
    
        const errorHandler = (err: Error) => {
            console.log('Error fetching messages', err.message);
        };

        let fetchURI = '';
        if (props.chatTarget === ChatTarget.SELF) {
            fetchURI = '/api/profile/messages';
        } else if (props.chatTarget === ChatTarget.GROUP) {
            const { groupId, channelId } = props as GroupChatProps;
            fetchURI = `/api/group/text-channel/messages/${groupId}/${channelId}`;
        } else {
            // TODO: define fetchURI for ChatTarget.FRIEND
        }

        // Makes GET request to get the messages
        getRequest(
            fetchURI,
            accessToken,
            successHandler,
            errorHandler
        );
    }, [accessToken]);

    return (
        <div className='chat-box'>
            <div className='chat-header'>
                {/* {props.channel.name} */}
            </div>

            {
                props.chatTarget === ChatTarget.SELF?
                    <>
                        <ChatBody messages={messages}/>
                        <SelfChatFooter setMessages={setMessages} />
                    </>
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
    );
};

export default Chat;