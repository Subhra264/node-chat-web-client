import { ChatSetMessages } from '../Chat';
import ChatFooter from './ChatFooter';

interface SelfChatFooterProps extends ChatSetMessages {}

const SelfChatFooter: React.FC<SelfChatFooterProps> = (props) => {
  return (
    <ChatFooter
      fetchURI="/api/profile/messages"
      setMessages={props.setMessages}
    />
  );
};

export default SelfChatFooter;
