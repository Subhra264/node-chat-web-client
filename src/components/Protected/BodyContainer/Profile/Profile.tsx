import Chat from '../Chat/Chat';
import GroupList, { Group } from '../GroupList/GroupList';
import MemberList from '../MemberList/MemberList';
import ProfileDetails from './ProfileDetails';

const Profile: React.FC = (): JSX.Element => {
    return (
        <div id='chat-body-container'>
            {/* TODO: provide a proper props for the GroupList component */}
            <GroupList groups={undefined}/>
            <MemberList />
            <Chat />
            <ProfileDetails />
        </div>
    );
}

export default Profile;