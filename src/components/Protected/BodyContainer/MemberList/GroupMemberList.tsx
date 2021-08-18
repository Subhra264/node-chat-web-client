import { useContext } from 'react';
import { GroupContext } from '../../../../utils/contexts';
import MemberList from './MemberList';

const GroupMemberList: React.FC = (props): JSX.Element => {
    const { groupId } = useContext(GroupContext); 

    return (
        <MemberList 
            fetchURI={`/api/groups/${groupId}/members`}
            effectDeps={[groupId]}
        />
    );
};

export default GroupMemberList;