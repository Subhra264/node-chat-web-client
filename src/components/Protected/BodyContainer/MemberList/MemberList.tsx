import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest } from '../../../../utils/fetch-requests';

interface Member {
  _id: string;
  username: string;
  profilePic: string;
}

interface MemberListProps {
  fetchURI: string;
  effectDeps: React.DependencyList;
}

const MemberList: React.FC<MemberListProps> = (props): JSX.Element => {
  const [memberList, setMemberList] = useState<Member[]>([]);

  useEffect(() => {
    const successHandler = (result: any) => {
      setMemberList(result);
    };

    const errorHandler = (err: Error) => {
      console.log('Error fetching members', err.message);
    };

    // fetches the list of members in the group
    getRequest(props.fetchURI, successHandler, errorHandler);
  }, [...props.effectDeps]);

  return (
    <div className="item-list">
      {props.children}
      {memberList.map((member: Member) => (
        <div key={member._id} className="item">
          <Link to={`/profile/${member._id}`}>{member.username}</Link>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
