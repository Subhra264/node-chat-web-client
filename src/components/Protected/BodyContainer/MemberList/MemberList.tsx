// import { Link } from 'react-router-dom';

interface Member {
    _id: string;
    userName: string;
    profilePic: string;
}

interface MemberListProps {
    members: [Member];
}

const MemberList: React.FC = (props): JSX.Element => {
    return (
        <div className='item-list'>
            <div id='invite-friends' className='item'>
                Invite friends
            </div>
            {
                // props.members?.map((member: Member) => (
                //     <div key={member._id} className='item'>
                //         <Link to={`profile/${member._id}`}>{member.userName}</Link>
                //     </div>
                // ))
            }
        </div>
    )
};

export default MemberList;