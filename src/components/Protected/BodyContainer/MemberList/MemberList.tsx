import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccessToken } from "../../../../hooks/useUserSelector";
import { getRequest } from "../../../../utils/fetch-requests";

interface Member {
    _id: string;
    username: string;
    profilePic: string;
}

interface MemberListProps {
    fetchURI: string;
    effectDeps: React.DependencyList;
}

const MemberList: React.FC<MemberListProps> = (props: MemberListProps): JSX.Element => {
    const [memberList, setMemberList] = useState<Member[]>([]);
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
            props.fetchURI,
            accessToken,
            successHandler,
            errorHandler,
            dispatch
        );
    }, [...props.effectDeps]);

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