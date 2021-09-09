import './ProfileDetails.scss';

const ProfileDetails: React.FC = (props): JSX.Element => {
    return (
        <div className='profile-details'>
            <div className='profilePic'>
                Profile Pic
            </div>
            {/* <div>{props.username}</div>
            <div>{props.name}</div>
            <div>{props.about}</div> */}
        </div>
    );
}

export default ProfileDetails;