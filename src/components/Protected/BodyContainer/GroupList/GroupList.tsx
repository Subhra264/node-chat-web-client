import { MouseEventHandler, MouseEvent, useState, ChangeEvent, ChangeEventHandler, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useUserSelector from '../../../../hooks/useUserSelector';
import { FetchDetails, getRequest, protectedRequest } from '../../../../utils/fetch-requests';
import { User } from '../../../../utils/reducers/User.reducer';
import { FormProps } from '../../../Form/Form';
import ModalBox from '../../../ModalBox/ModalBox';

export interface Group {
    _id: string;
    name: string;
    image?: string;
    // unreadMsg?: number;
}

const GroupList: React.FC = (props): JSX.Element => {
    const [show, setShow] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [fetchedGroupList, setFetchedGroupList] = useState<Group[]>([]);
    const user: User = useUserSelector();
    const dispatch = useDispatch();
    
    const onGroupNameChange: ChangeEventHandler<HTMLInputElement> = (ev: ChangeEvent<HTMLInputElement>) => {
        setNewGroupName(ev.target.value);
    };

    const openModalBox: MouseEventHandler = (ev: MouseEvent) => {
        ev.preventDefault();

        setShow(true);
    };

    // Called when creating a new Group
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
                name: newGroupName
            }
        };
        const accessToken = user.accessToken? user.accessToken : '';

        // Makes POST request to the '/api/group/' endpoint
        protectedRequest( 
            fetchDetails,
            accessToken,
            successHandler,
            errorHandler,
            dispatch
        );
    };

    const formProps: FormProps = {
        fields: {
            groupName: {
                type: 'text',
                required: true,
                placeholder: 'Group Name',
                value: newGroupName,
                onChange: onGroupNameChange
            }
        },
        onSubmit: createGroup
    };

    // Fetches the list of groups, the user is part of
    useEffect(() => {
        const successHandler = (result: any) => {
            setFetchedGroupList(result);
        };

        const errorHandler = (err: Error) => {
            console.log('Error fetching groupList', err.message);
        };

        getRequest(
            '/api/user/groups',
            user.accessToken? user.accessToken : '',
            successHandler,
            errorHandler
        );
    }, [user.accessToken]);

    return (
        <div id='group-list'>
            {
                fetchedGroupList.map((group: Group) => (
                    <div className='group' key={group._id}>
                        {/* TODO: The response also return the welcome channel id */}
                        <Link to={group._id}>{group.name}</Link>
                    </div>
                ))
            }
            <div className='group' id='add-group' onClick={openModalBox}>+</div>
            <ModalBox show={show} setShow={setShow} form={formProps}/>
        </div>
    );
};

export default GroupList;