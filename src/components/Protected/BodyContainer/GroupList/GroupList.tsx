import { MouseEventHandler, MouseEvent, useState, ChangeEvent, ChangeEventHandler } from 'react';
import { Link } from 'react-router-dom';
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
    
    const onGroupNameChange: ChangeEventHandler<HTMLInputElement> = (ev: ChangeEvent<HTMLInputElement>) => {
        setGroupName(ev.target.value);
    };

    const openModalBox: MouseEventHandler = (ev: MouseEvent) => {
        ev.preventDefault();

        setShow(true);
    };

    const createGroup: MouseEventHandler = (ev: MouseEvent) => {
        ev.preventDefault();

        fetch('/api/group', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer `
            },
            body: JSON.stringify({
                name: groupName
            })
        }).then(res => (
            res.json()
        )).then(result => {
            console.log(result);
        }).catch(err => {
            console.log('Error creating new Group', err);
        });
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
            <ModalBox show={show} form={formProps}/>
        </div>
    );
};

export default GroupList;