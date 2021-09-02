import Chat, { ChatTarget } from '../Chat/Chat';
import FriendList from '../MemberList/FriendList';
import ProfileDetails from './ProfileDetails';

const Profile: React.FC = (): JSX.Element => {
    return (
        <div id='chat-body-container'>
            {/* TODO: provide a proper props for the GroupList component */}
            <FriendList />
            <Chat chatTarget={ChatTarget.SELF} />
            <ProfileDetails />
        </div>
    );
};

export default Profile;