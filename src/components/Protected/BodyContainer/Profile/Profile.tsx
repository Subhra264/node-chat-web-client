import Chat from '../Chat/Chat';
import GroupList from '../GroupList/GroupList';
import FriendList from '../MemberList/FriendList';
import ProfileDetails from './ProfileDetails';

const Profile: React.FC = (): JSX.Element => {
    return (
        <div id='chat-body-container'>
            {/* TODO: provide a proper props for the GroupList component */}
            <FriendList />
            <Chat chatTargetSelf={true} />
            <ProfileDetails />
        </div>
    );
};

export default Profile;