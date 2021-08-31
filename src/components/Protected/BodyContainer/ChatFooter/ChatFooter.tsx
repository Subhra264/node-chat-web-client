import { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { useAccessToken } from '../../../../hooks/useUserSelector';
// import { SocketContext } from '../../../../utils/contexts';
import { FetchDetails, protectedRequest } from '../../../../utils/fetch-requests';
import './ChatFooter.scss';

export interface ChatFooterProps {
    fetchURI: string;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const ChatFooter: React.FC<ChatFooterProps> = (props: ChatFooterProps): JSX.Element => {
    const [message, setMessage] = useState('');
    const [placeholder, setPlaceholder] = useState('Type here...');
    const chatBodyRef: React.MutableRefObject<HTMLElement | null> = useRef<HTMLElement | null>(null);
    // const socket = useContext(SocketContext);
    const accessToken: string = useAccessToken();
    const dispatch = useDispatch();

    useEffect(() => {
        chatBodyRef.current = document.getElementById('chat-body');
    }, []);

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
        };

        const errorHandler = (err: Error) => {
            console.log('Error sending message', err.message);
        };

        const fetchDetails: FetchDetails = {
            // fetchURI: '/api/group/text-channel/message',
            fetchURI: props.fetchURI,
            method: 'POST',
            body: {
                message: trimmedMessage
            }
        };

        // Makes POST request to save message
        protectedRequest(
            fetchDetails,
            accessToken,
            successHandler,
            errorHandler,
            dispatch
        );

        const messageElem: HTMLDivElement = document.createElement('div');
        messageElem.classList.add('right');
        messageElem.innerText = trimmedMessage;

        chatBodyRef.current?.appendChild(messageElem);
        // console.log(socket);
        setMessage('');
        // socket?.emit('send-message', { message, userId, username });
    }

    return (
        <>
            <div className='editor-container'>
                <textarea id="editor" placeholder={placeholder} onChange={onChange} value={message} />
            </div>
            <div className='send'>
                <button onClick={onSendClick} >Send</button>
            </div>
        </>
    );
};


export default ChatFooter;