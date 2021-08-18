import { useParams } from 'react-router-dom';
import { GroupContext, GroupContextValue } from '../../../../utils/contexts';
import ChannelList from '../ChannelList/ChannelList';
import Chat from '../Chat/Chat';
import GroupMemberList from '../MemberList/GroupMemberList';

// Represents a Group
const Group: React.FC = (props): JSX.Element => {
    const { groupId, channelId }: GroupContextValue = useParams(); 

    return (
        <GroupContext.Provider value={{ groupId, channelId }}>
            <ChannelList />
            <Chat />
            <GroupMemberList />
        </GroupContext.Provider>
    );
};

export default Group;