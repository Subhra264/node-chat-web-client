import { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
// import { SocketContext } from '../../../../utils/contexts';
import { FetchDetails, protectedRequest } from '../../../../utils/fetch-requests';
import { ChatSetMessages, Message } from '../Chat/Chat';
import './ChatFooter.scss';

export interface ChatFooterProps extends ChatSetMessages{
    fetchURI: string;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const ChatFooter: React.FC<ChatFooterProps> = (props: ChatFooterProps): JSX.Element => {
    const [message, setMessage] = useState('');
    const [placeholder, setPlaceholder] = useState('Type here...');
    // const chatBodyRef: React.MutableRefObject<HTMLElement | null> = useRef<HTMLElement | null>(null);
    // const socket = useContext(SocketContext);

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(ev.target.value);
    };

    const onSendClick: MouseEventHandler<HTMLButtonElement> = (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        if (!message) {
            setPlaceholder('Please type something...');
            return;
        }
        const trimmedMessage = message.trim();

        const successHandler = (result: any) => {
            // Do something here...
            console.log('Message sent: ', result);
        };

        const errorHandler = (err: Error) => {
            console.log('Error sending message', err.message);
        };

        const fetchDetails: FetchDetails = {
            fetchURI: props.fetchURI,
            method: 'POST',
            body: {
                message: trimmedMessage
            }
        };

        // Makes POST request to save message
        protectedRequest(
            fetchDetails,
            successHandler,
            errorHandler
        );

        // In this case, as the user himself sending the message, 
        // so no need to specify sender seperately
        // Only the message is important here
        props.setMessages((prevMessages) => [
            ...prevMessages,
            { message: trimmedMessage }
        ] as [Message]);

        setMessage('');
        // socket?.emit('send-message', { message, userId, username });
    }

    return (
        <div className='chat-footer'>
            <div className='editor-container'>
                <textarea id="editor" placeholder={placeholder} onChange={onChange} value={message} />
            </div>
            <div className='send'>
                <button onClick={onSendClick} >Send</button>
            </div>
        </div>
    );
};


export default ChatFooter;