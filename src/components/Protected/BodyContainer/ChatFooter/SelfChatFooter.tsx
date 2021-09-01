import { ChatSetMessages, Message } from '../Chat/Chat';
import ChatFooter from './ChatFooter';

interface SelfChatFooter extends ChatSetMessages {}

const SelfChatFooter: React.FC<SelfChatFooter> = (props) => {

    return (
        <ChatFooter 
            fetchURI='/api/profile/message'
            setMessages={props.setMessages}
        />
    );
};

export default SelfChatFooter;