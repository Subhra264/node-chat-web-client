import { MouseEventHandler, MouseEvent, useState, ChangeEvent, ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FetchDetails, protectedRequest } from '../../../../utils/fetch-requests';
import { User } from '../../../../utils/reducers/User.reducer';
import { FormProps } from '../../../Form/Form';
import ModalBox from '../../../ModalBox/ModalBox';

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
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState('');
    const user = useSelector<User, User>((state: User) => state);
    
    const onGroupNameChange: ChangeEventHandler<HTMLInputElement> = (ev: ChangeEvent<HTMLInputElement>) => {
        setGroupName(ev.target.value);
    };

    const openModalBox: MouseEventHandler = (ev: MouseEvent) => {
        ev.preventDefault();

        setShow(true);
    };

    const createGroup: MouseEventHandler = (ev: MouseEvent) => {
        ev.preventDefault();

        const successHandler = (result: any) => {
            console.log('New Group result', result);
            setShow(false);
        };

        const errorHandler = (err: Error) => {
            console.log('Error creating new Group', err.message);
        };

        const fetchDetails: FetchDetails = {
            fetchURI: '/api/group',
            method: 'POST',
            body: {
                name: groupName
            }
        };
        const accessToken = user.accessToken? user.accessToken : '';
        protectedRequest(fetchDetails, accessToken, successHandler, errorHandler);
    };

    const formProps: FormProps = {
        fields: {
            groupName: {
                type: 'text',
                required: true,
                placeholder: 'Group Name',
                value: groupName,
                onChange: onGroupNameChange
            }
        },
        onSubmit: createGroup
    };

    return (
        <div id='group-list'>
            {
                props.groups?.map((group) => (
                    <div className='group' key={group.id}>
                        <Link to={group.id}>{group.name}</Link>
                    </div>
                ))
            }
            <div className='group' id='add-group' onClick={openModalBox}>+</div>
            <ModalBox show={show} setShow={setShow} form={formProps}/>
        </div>
    );
};

export default GroupList;