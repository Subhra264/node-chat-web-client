import MemberList from './MemberList';

const FriendList: React.FC = (props): JSX.Element => {
  return <MemberList fetchURI="/api/profile/friends" effectDeps={[]} />;
};

export default FriendList;
