import { Link } from 'react-router-dom';

export interface Group {
    id: string;
    name: string;
    grpImage?: string;
    unreadMsg?: number;
}

interface GroupListProps {
    groups: [Group] | undefined;
}

const GroupList: React.FC<GroupListProps> = (props: GroupListProps): JSX.Element => {
    return (
        <div id='group-list'>
            {
                props.groups?.map((group) => (
                    <div className='group' key={group.id}>
                        <Link to={group.id}>{group.name}</Link>
                    </div>
                ))
            }
            <div className='group'>+</div>
        </div>
    )
};

export default GroupList;