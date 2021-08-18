import { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccessToken } from '../../../../hooks/useUserSelector';
import { SocketContext } from '../../../../utils/contexts';
import { FetchDetails, protectedRequest } from '../../../../utils/fetch-requests';

const ChatFooter: React.FC = (props): JSX.Element => {
    const [message, setMessage] = useState('');
    const [placeholder, setPlaceholder] = useState('Type here...');
    const chatBodyRef: React.MutableRefObject<HTMLElement | null> = useRef<HTMLElement | null>(null);
    const socket = useContext(SocketContext);
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

        // fetch('/api/group/text-channel/message', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer `
        //     },
        //     body: JSON.stringify({
        //         message: trimmedMessage
        //         // groupId,
        //         // channelId
        //     })
        // }).then(res => (
        //     res.json()
        // )).then(result => {
        //     if (result.type === 'error') throw new Error(result.message.message);
        // }).catch(err => {
        //     console.log('Error sending message:', err.message);
        // });

        const successHandler = (result: any) => {
            // Do something here...
        };

        const errorHandler = (err: Error) => {
            console.log('Error sending message', err.message);
        };

        const fetchDetails: FetchDetails = {
            fetchURI: '/api/group/text-channel/message',
            method: 'PUT',
            body: {
                message: trimmedMessage
            }
        };

        // Makes PUT request to save message
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
        console.log(socket);
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