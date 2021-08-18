import MemberList from './MemberList';

const FriendList: React.FC = (props): JSX.Element => {
    return (
        <MemberList 
            // TODO: add the fetchURI
            fetchURI=''
            effectDeps={[]}
        />
    );
};

export default FriendList;