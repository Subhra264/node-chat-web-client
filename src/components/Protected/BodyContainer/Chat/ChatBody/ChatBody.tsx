import useUserSelector from '../../../../../hooks/useUserSelector';
import { User } from '../../../../../utils/reducers/User.reducer';
import { Message } from '../Chat';
import './ChatBody.scss';

export interface ChatBodyProps {
  messages: [Message] | [];
}

const LeftMessage: React.FC<Message> = (props): JSX.Element => {
  return (
    <div className="left">
      {props.sender.username}
      <div className="left-content">{props.message}</div>
    </div>
  );
};

const RightMessage: React.FC<Message> = (props): JSX.Element => {
  return <div className="right">{props.message}</div>;
};

const ChatBody: React.FC<ChatBodyProps> = (props): JSX.Element => {
  const user: User = useUserSelector();

  return (
    <div className="chat-body">
      {props.messages.map((message: Message) => (
        <>
          {message.sender === undefined ||
          message.sender.reference === user.userId ? (
            <RightMessage {...message} key={message._id} />
          ) : (
            <LeftMessage {...message} key={message._id} />
          )}
        </>
      ))}
    </div>
  );
};

export default ChatBody;
