import ChatFooter from './ChatFooter';

const SelfChatFooter: React.FC = (props) => {

    return (
        <ChatFooter 
            fetchURI='/api/profile/message'
        />
    );
};