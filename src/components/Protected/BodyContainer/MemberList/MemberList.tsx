import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccessToken } from "../../../../hooks/useUserSelector";
import { GroupContext } from "../../../../utils/contexts";
import { getRequest } from "../../../../utils/fetch-requests";

interface Member {
    _id: string;
    username: string;
    profilePic: string;
}

interface MemberListProps {
    members: [Member];
}

const MemberList: React.FC = (props): JSX.Element => {
    const [memberList, setMemberList] = useState<Member[]>([]);
    const { groupId } = useContext(GroupContext);
    const accessToken = useAccessToken();
    const dispatch = useDispatch();

    useEffect(() => {
        const successHandler = (result: any) => {
            setMemberList(result);
        };

        const errorHandler = (err: Error) => {
            console.log('Error fetching members', err.message);
        };

        // fetches the list of members in the group
        getRequest(
            `/groups/${groupId}/members`,
            accessToken,
            successHandler,
            errorHandler,
            dispatch
        );
    }, [groupId]);

    return (
        <div className='item-list'>
            <div id='invite-friends' className='item add-item'>
                Invite friends
            </div>
            {
                memberList.map((member: Member) => (
                    <div key={member._id} className='item'>
                        <Link to={`/profile/${member._id}`}>{member.username}</Link>
                    </div>
                ))
            }
        </div>
    )
};

export default MemberList;